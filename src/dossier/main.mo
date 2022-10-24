import List "mo:base/List";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";


actor dossier{

  // Tokenomics and Token Details ( All Hard Coded Values )
  let totalSupply: Nat = 1000000000000;
  let symbol: Text = "DOSS";
  let ownerPrincipal: Text = "4sgdh-3mrsd-3k7t6-2wche-fz6k5-nyjwg-lna6q-o4wz2-qvtuv-heoml-iqe";
  let faucetPrincipal: Text = "vuuo7-hyaaa-aaaal-qbfja-cai";
  // Live Canister ID - vuuo7-hyaaa-aaaal-qbfja-cai
  // Live Canister Frontend ID - vtvil-kaaaa-aaaal-qbfjq-cai
  //  Live Website Link - vtvil-kaaaa-aaaal-qbfjq-cai.raw.ic0.app
  // Local Canister ID - rrkah-fqaaa-aaaaa-aaaaq-cai
  let giveAmount = 5000;
  let createLogFee: Nat = 5;
  let deleteLogFee: Nat = 1;

  // Owner Principal
  let owner : Principal = Principal.fromText(ownerPrincipal);
  
  // Faucet Principal 
  let faucet : Principal = Principal.fromText(faucetPrincipal);

  private stable var balanceEntries : [(Principal, Nat)] = [];
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  
  if(balances.size() < 1){
    balances.put(owner, totalSupply);
  };

  // Get Log Creation Fee
  public query func getCreateLogFee(): async Nat{
    return createLogFee;
  };

  // Get Log Deletion Fee
  public query func getDeleteLogFee(): async Nat{
    return deleteLogFee;
  };

  // Get Token Symbol
  public query func getSymbol(): async Text{
    return symbol;
  };

  // Dossier Finance
  // Balance Block
  public query func balanceOf(who: Principal): async Nat{
    let balance: Nat = switch(balances.get(who)){
      case null 0;
      case(?result) result;
    };
    return balance;
  };

  // Faucet Block
  public shared(msg) func payOut(): async Text{
    Debug.print(debug_show(msg.caller));
    if(balances.get(msg.caller) == null){
      let result = await transfer(msg.caller, giveAmount);
      return result;
    }else{
      return "! Aready Claimed !";
    }
  };
  
  //Transfer Block

  public shared(msg) func transfer(to: Principal, amount: Nat): async Text{
    let fromBalance = await balanceOf(msg.caller);
    if(fromBalance>=amount){
      let newFromBalance: Nat = fromBalance - amount;
      balances.put(msg.caller, newFromBalance);

      let toBalance = await balanceOf(to);
      let newToBalance = toBalance + amount;
      balances.put(to, newToBalance);
      
      return "! Success !";
    }else{
      return "! Insufficient Funds !";
    }
  }; 

  // Create Log Fee Deduction
  public shared(msg) func deductCreateLogFee():async Text{
    let userBalance = await balanceOf(msg.caller);
    if(userBalance>=createLogFee){
      let newUserBalance: Nat = userBalance - createLogFee;
      balances.put(msg.caller, newUserBalance);
      let faucetBalance: Nat = await balanceOf(faucet);
      let newFaucetBalance = faucetBalance + createLogFee;
      balances.put(faucet, newFaucetBalance);
      return "! Success !";
    }else{
      return "! Insufficient Funds !";
    }
  };

  // Delete Log Fee Deduction
  public shared(msg) func deductDeleteLogFee():async Text{
    let userBalance = await balanceOf(msg.caller);
    if(userBalance>=deleteLogFee){
      let newUserBalance: Nat = userBalance - deleteLogFee;
      balances.put(msg.caller, newUserBalance);

      let faucetBalance: Nat = await balanceOf(faucet);
      let newFaucetBalance = faucetBalance + deleteLogFee;
      balances.put(faucet, newFaucetBalance);
      return "! Success !";
    }else{
      return "! Insufficient Funds !";
    }
  };

  // Dossier 
  // Create Log 
  public type Log = {
    title: Text;
    content: Text;
    time: Text;
    date: Text;
  };

  stable var logs: List.List<Log> = List.nil<Log>();

  public func createLog(titleText: Text, contentText: Text, timeText: Text, dateText: Text){
      let newLog: Log = {
        title = titleText;
        content = contentText;
        time = timeText;
        date = dateText;
      };
      logs:= List.push(newLog, logs);
      Debug.print(debug_show(logs));
  };

  // View Log
  public query func readLogs(): async [Log]{
    return List.toArray(logs)
  };

  // Delete Log
  public func removeLog(id: Nat){

      let listFront = List.take(logs, id);
      let listBack = List.drop(logs, id+1);
      logs := List.append(listFront, listBack);

  };

  system func preupgrade(){
    balanceEntries:= Iter.toArray(balances.entries());
  };

  system func postupgrade(){
    balances:= HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    if(balances.size() < 1){
      balances.put(owner, totalSupply);
    };
  };

}