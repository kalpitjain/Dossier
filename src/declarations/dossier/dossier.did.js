export const idlFactory = ({ IDL }) => {
  const Log = IDL.Record({
    'title' : IDL.Text,
    'content' : IDL.Text,
    'date' : IDL.Text,
    'time' : IDL.Text,
  });
  return IDL.Service({
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'createLog' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        ['oneway'],
      ),
    'deductCreateLogFee' : IDL.Func([], [IDL.Text], []),
    'deductDeleteLogFee' : IDL.Func([], [IDL.Text], []),
    'getCreateLogFee' : IDL.Func([], [IDL.Nat], ['query']),
    'getDeleteLogFee' : IDL.Func([], [IDL.Nat], ['query']),
    'getSymbol' : IDL.Func([], [IDL.Text], ['query']),
    'payOut' : IDL.Func([], [IDL.Text], []),
    'readLogs' : IDL.Func([], [IDL.Vec(Log)], ['query']),
    'removeLog' : IDL.Func([IDL.Nat], [], ['oneway']),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
