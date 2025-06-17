import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRightLeft, Ruler } from 'lucide-react';
 
interface Unit {
  name: string;
  symbol: string;
  toMeters: number; // 转换为米的系数
}

const units: Unit[] = [
  { name: '密耳', symbol: 'mil', toMeters: 0.0000254 },
  { name: '毫米', symbol: 'mm', toMeters: 0.001 },
  { name: '米', symbol: 'm', toMeters: 1 },
  { name: '厘米', symbol: 'cm', toMeters: 0.01 },
  { name: '英寸', symbol: 'in', toMeters: 0.0254 },
  { name: '英尺', symbol: 'ft', toMeters: 0.3048 },
  { name: '码', symbol: 'yd', toMeters: 0.9144 },
  { name: '千米', symbol: 'km', toMeters: 1000 },
  { name: '微米', symbol: 'μm', toMeters: 0.000001 },
];

function App() {
  const [inputValue, setInputValue] = useState<string>('1');
  const [inputUnit, setInputUnit] = useState<Unit>(units.find(u => u.symbol === 'mil') || units[0]); // 默认密耳
  const [outputUnit, setOutputUnit] = useState<Unit>(units.find(u => u.symbol === 'mm') || units[1]); // 默认毫米
  const [result, setResult] = useState<string>('0.0254'); // 1 mil = 0.0254 mm

  // 转换函数
  const convertUnits = (value: number, from: Unit, to: Unit): number => {
    // 先转换为米，再转换为目标单位
    const meters = value * from.toMeters;
    return meters / to.toMeters;
  };

  // 实时计算结果
  useEffect(() => {
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      const convertedValue = convertUnits(numValue, inputUnit, outputUnit);
      setResult(convertedValue.toFixed(8).replace(/\.?0+$/, ''));
    } else {
      setResult('0');
    }
  }, [inputValue, inputUnit, outputUnit]);

  // 交换输入输出单位
  const swapUnits = () => {
    const tempUnit = inputUnit;
    setInputUnit(outputUnit);
    setOutputUnit(tempUnit);
    setInputValue(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* 标题 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Calculator className="w-8 h-8 text-blue-300" />
            </div>
            <h1 className="text-4xl font-bold text-white">PP_O专属单位换算器</h1>
          </div>
          <p className="text-blue-200 text-lg">精确快捷的长度单位转换工具</p>
        </div>

        {/* 主换算器 */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="space-y-8">
            {/* 输入部分 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <Ruler className="w-4 h-4" />
                输入数值
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white text-xl placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    placeholder="请输入数值"
                  />
                </div>
                <div>
                  <select
                    value={inputUnit.symbol}
                    onChange={(e) => setInputUnit(units.find(u => u.symbol === e.target.value) || units[0])}
                    className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white text-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                  >
                    {units.map(unit => (
                      <option key={unit.symbol} value={unit.symbol} className="bg-slate-800 text-white">
                        {unit.name} ({unit.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 交换按钮 */}
            <div className="flex justify-center">
              <button
                onClick={swapUnits}
                className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-2xl text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
              >
                <ArrowRightLeft className="w-6 h-6" />
              </button>
            </div>

            {/* 输出部分 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <Calculator className="w-4 h-4" />
                转换结果
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="w-full px-6 py-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-2xl text-white text-xl font-semibold min-h-[60px] flex items-center">
                    {result}
                  </div>
                </div>
                <div>
                  <select
                    value={outputUnit.symbol}
                    onChange={(e) => setOutputUnit(units.find(u => u.symbol === e.target.value) || units[1])}
                    className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white text-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                  >
                    {units.map(unit => (
                      <option key={unit.symbol} value={unit.symbol} className="bg-slate-800 text-white">
                        {unit.name} ({unit.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 快捷单位按钮 */}
            <div className="space-y-4">
              <div className="text-white/80 text-sm font-medium">常用单位快捷选择</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {units.slice(0, 8).map(unit => (
                  <button
                    key={unit.symbol}
                    onClick={() => setInputUnit(unit)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      inputUnit.symbol === unit.symbol
                        ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/20'
                    }`}
                  >
                    {unit.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 转换公式显示 */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-center text-white/60 text-sm">
                <div className="font-mono text-lg mb-2">
                  {inputValue} {inputUnit.symbol} = {result} {outputUnit.symbol}
                </div>
                <div className="text-xs">
                  转换系数: 1 {inputUnit.symbol} = {(inputUnit.toMeters / outputUnit.toMeters).toFixed(6)} {outputUnit.symbol}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部说明 */}
        <div className="text-center mt-8 text-white/50 text-sm">
          <p>支持精确到小数点后8位的转换计算</p>
        </div>
      </div>
    </div>
  );
}

export default App;