import { beginCell, toNano } from '@ton/core';

// 演示如何计算消息的opcode
function calculateMessageOpcode(messageName: string): string {
    // 使用简单的哈希算法计算opcode
    let hash = 0;
    for (let i = 0; i < messageName.length; i++) {
        const char = messageName.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // 转换为32位整数
    }
    
    // 转换为16进制
    return '0x' + Math.abs(hash).toString(16).padStart(8, '0');
}

// 示例消息
const messages = [
    'Increment',
    'Decrement', 
    'Reset',
    'Transfer',
    'Mint',
    'Burn'
];

console.log('🔧 消息Opcode生成器\n');

messages.forEach(msg => {
    const opcode = calculateMessageOpcode(msg);
    console.log(`message(${opcode}) ${msg} {`);
    console.log(`    // 在这里添加字段`);
    console.log(`}\n`);
});

console.log('💡 提示:');
console.log('- 这只是演示，实际开发中建议使用Tact编译器自动生成');
console.log('- 或者使用专门的工具来避免opcode冲突');
console.log('- 对于简单项目，可以省略opcode让编译器自动处理');
