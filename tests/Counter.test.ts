import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Counter } from '../build/Counter_Counter';

describe('Counter Contract Tests', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let user: SandboxContract<TreasuryContract>;
    let counter: SandboxContract<Counter>;

    beforeAll(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        user = await blockchain.treasury('user');

        const counterContract = await Counter.fromInit(deployer.address);
        counter = blockchain.openContract(counterContract);

        // 部署合约
        await counter.send(
            deployer.getSender(),
            { value: toNano('0.05') },
            { $$type: 'Deploy', queryId: 0n }
        );
    });

    test('初始状态应该正确', async () => {
        const counterValue = await counter.getCounter();
        expect(counterValue).toBe(0n);

        const owner = await counter.getOwner();
        expect(owner.toString()).toBe(deployer.address.toString());
    });

    test('应该能够增加计数器', async () => {
        await counter.send(
            user.getSender(),
            { value: toNano('0.01') },
            { $$type: 'Increment', amount: 5n }
        );

        const counterValue = await counter.getCounter();
        expect(counterValue).toBe(5n);
    });

    test('应该能够减少计数器', async () => {
        // 先增加到15 (当前是5)
        await counter.send(
            user.getSender(),
            { value: toNano('0.01') },
            { $$type: 'Increment', amount: 10n }
        );

        // 然后减少3
        await counter.send(
            user.getSender(),
            { value: toNano('0.01') },
            { $$type: 'Decrement', amount: 3n }
        );

        const counterValue = await counter.getCounter();
        expect(counterValue).toBe(12n); // 5 + 10 - 3 = 12
    });

    test('计数器不应该变成负数', async () => {
        // 重置计数器到0
        await counter.send(
            deployer.getSender(),
            { value: toNano('0.01') },
            { $$type: 'Reset' }
        );

        // 尝试减少一个大于当前值的数
        await counter.send(
            user.getSender(),
            { value: toNano('0.01') },
            { $$type: 'Decrement', amount: 100n }
        );

        const counterValue = await counter.getCounter();
        expect(counterValue).toBe(0n);
    });

    test('owner应该能够重置计数器', async () => {
        // 先增加计数器
        await counter.send(
            user.getSender(),
            { value: toNano('0.01') },
            { $$type: 'Increment', amount: 50n }
        );

        // owner重置计数器
        await counter.send(
            deployer.getSender(),
            { value: toNano('0.01') },
            { $$type: 'Reset' }
        );

        const counterValue = await counter.getCounter();
        expect(counterValue).toBe(0n);
    });

    test('应该能够跟踪合约余额', async () => {
        // 获取发送前的余额
        const balanceBefore = await counter.getBalance();
        
        await counter.send(
            user.getSender(),
            { value: toNano('0.1') },
            { $$type: 'Increment', amount: 1n }
        );

        const balanceAfter = await counter.getBalance();
        // 余额应该增加（至少有一些gas费剩余）
        expect(balanceAfter).toBeGreaterThanOrEqual(balanceBefore);
    });
});