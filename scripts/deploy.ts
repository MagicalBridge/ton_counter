import { toNano, Address } from '@ton/core';
import { Counter } from '../build/Counter_Counter';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    console.log('🚀 开始部署Counter合约到TON测试网络...\n');

    // 获取部署者地址
    const deployer = provider.sender();
    
    if (!deployer.address) {
        console.error('❌ 无法获取部署者地址，请检查钱包配置');
        return;
    }

    console.log('👤 部署者地址:', deployer.address.toString());
    
    try {
        // 创建Counter合约实例
        console.log('📄 创建合约实例...');
        const counter = provider.open(await Counter.fromInit(deployer.address));
        console.log('📍 预计合约地址:', counter.address.toString());

        // 检查合约是否已经部署
        if (await provider.isContractDeployed(counter.address)) {
            console.log('⚠️  Counter合约已经部署在地址:', counter.address.toString());
            
            // 验证现有合约状态
            try {
                const currentCounter = await counter.getCounter();
                const owner = await counter.getOwner();
                console.log('📊 现有合约状态:');
                console.log('  - 计数器值:', currentCounter.toString());
                console.log('  - Owner:', owner.toString());
            } catch (e) {
                console.log('⚠️  无法获取合约状态，可能仍在同步中');
            }
            
            return;
        }

        console.log('⏳ 正在部署Counter合约...');
        console.log('💸 部署费用: 0.05 TON');

        // 部署合约
        await counter.send(
            deployer,
            {
                value: toNano('0.05'), // 部署费用
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        console.log('📤 部署交易已发送');
        console.log('⏳ 等待交易确认...');

        // 等待合约完全部署
        await provider.waitForDeploy(counter.address);

        console.log('\n✅ Counter合约部署成功!');
        console.log('🎯 合约地址:', counter.address.toString());
        console.log('👑 Owner地址:', deployer.address.toString());
        
        // 生成测试网浏览器链接
        const explorerUrl = `https://testnet.tonscan.org/address/${counter.address.toString()}`;
        console.log('🔍 浏览器查看:', explorerUrl);

        // 验证部署
        console.log('\n📊 验证部署状态:');
        try {
            const currentCounter = await counter.getCounter();
            const owner = await counter.getOwner();
            const balance = await counter.getBalance();

            console.log('  ✓ 当前计数器值:', currentCounter.toString());
            console.log('  ✓ 合约Owner:', owner.toString());
            console.log('  ✓ 合约余额:', (Number(balance) / 1e9).toFixed(4), 'TON');
            
            console.log('\n🎉 合约部署并验证成功!');
            console.log('\n📝 接下来你可以:');
            console.log('  1. 运行 npm run interact 与合约交互');
            console.log('  2. 在浏览器中查看合约状态');
            console.log('  3. 使用其他钱包向合约发送消息');
            
        } catch (error) {
            console.error('❌ 验证合约状态时出错:', error);
            console.log('合约可能仍在部署中，请稍后再试');
        }

    } catch (error) {
        console.error('\n❌ 部署失败:', error);
        console.log('\n🔧 可能的解决方案:');
        console.log('  1. 检查钱包余额是否足够 (需要至少0.1 TON)');
        console.log('  2. 确认助记词配置正确');
        console.log('  3. 检查网络连接');
        console.log('  4. 稍后重试');
    }
}
