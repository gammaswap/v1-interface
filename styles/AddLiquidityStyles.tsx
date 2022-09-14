export const AddLiquidityStyles = () => {
  return {
    wrapper: 'w-screen flex justify-center items-center',
    content: 'bg-gray-900 w-[30rem] rounded-2xl p-4',
    formHeader: 'justify-between items-center font-semibold text-xl text-gray-200 text-center',
    tokenContainer:
      'bg-gray-800 my-3 rounded-2xl p-6 text-3xl border-2 border-gray-800 hover:border-gray-600 flex justify-between',
    tokenInput: 'bg-transparent placeholder:text-gray-600 outline-none mb-6 w-full text-4xl text-gray-300 mt-4',
    nonSelectedTokenContainer: 'flex items-center w-2/3 text-gray-200',
    nonSelectedTokenContent:
      'w-full h-min flex justify-center items-center bg-blue-500 rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem] shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-blue-600/30',
    tokenSelectorContainer: 'items-center w-1/ text-gray-200',
    tokenSelectorContent:
      'w-full h-min flex justify-between items-center bg-gray-700 rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem] shadow-lg shadow-gray-700/30 hover:bg-gray-900 hover:shadow-gray-900/30',
    tokenSelectorIcon: 'flex items-center',
    tokenSelectorTicker: 'mx-2',
    tokenBalance: 'self-end mt-2 text-sm text-gray-300 opacity-50 text-right',
    dropdownArrow: 'w-12 h-8',
    invalidatedButton:
      'disabled my-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center text-gray-600 mt-8 border-2 border-gray-700',
    confirmButton:
      'bg-primaryV1-7 my-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center cursor-pointer text-white mt-8 border-2 border-green-400 hover:border-green-300',
  }
}
