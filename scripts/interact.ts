import { toNano, Address } from '@ton/core';
import { Counter } from '../build/Counter_Counter';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();
    
    // 获取合约地址
    const counterAddress = Address.parse(args.length > 0 ? args[0] : await ui.input('请输入Counter合约地址:'));
    
    // 连接到合约
    const counter = provider.open(Counter.fromAddress(counterAddress));
    
    // 检查合约是否存在
    if (!(await provider.isContractDeployed(counter.address))) {
        ui.write('❌ 合约不存在于此地址');
        return;
    }

    const sender = provider.sender();
    
    while (true) {
        // 显示当前状态
        try {
            const currentCounter = await counter.getCounter();
            const owner = await counter.getOwner();
            const balance = await counter.getBalance();
            
            ui.write('\n📊 当前合约状态:');
            ui.write(`- 计数器值: ${currentCounter}`);
            ui.write(`- Owner: ${owner}`);
            ui.write(`- 余额: ${balance} nanoTON`);
            ui.write(`- 你的地址: ${sender.address}`);
        } catch (error) {
            ui.write('❌ 获取合约状态失败: ' + error);
            return;
        }

        // 显示操作选项
        ui.write('\n🎮 可用操作:');
        ui.write('1. 增加计数器 (Increment)');
        ui.write('2. 减少计数器 (Decrement)');
        ui.write('3. 重置计数器 (Reset - 仅Owner)');
        ui.write('4. 退出');

        const action = await ui.choose('选择操作:', ['增加', '减少', '重置', '退出']);

        try {
            switch (action) {
                case '增加':
                    const incrementAmount = parseInt(await ui.input('输入增加的数量:'));
                    ui.write('正在发送Increment消息...');
                    await counter.send(
                        sender,
                        { value: toNano('0.01') },
                        { $$type: 'Increment', amount: BigInt(incrementAmount) }
                    );
                    ui.write('✅ Increment消息已发送');
                    break;

                case '减少':
                    const decrementAmount = parseInt(await ui.input('输入减少的数量:'));
                    ui.write('正在发送Decrement消息...');
                    await counter.send(
                        sender,
                        { value: toNano('0.01') },
                        { $$type: 'Decrement', amount: BigInt(decrementAmount) }
                    );
                    ui.write('✅ Decrement消息已发送');
                    break;

                case '重置':
                    ui.write('正在发送Reset消息...');
                    await counter.send(
                        sender,
                        { value: toNano('0.01') },
                        { $$type: 'Reset' }
                    );
                    ui.write('✅ Reset消息已发送');
                    break;

                case '退出':
                    return;
            }
            
            // 等待交易确认
            ui.write('⏳ 等待交易确认...');
            await new Promise(resolve => setTimeout(resolve, 3000));
            
        } catch (error) {
            ui.write('❌ 操作失败: ' + error);
        }
    }
}
