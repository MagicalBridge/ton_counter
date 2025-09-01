import "@stdlib/deploy";

// 消息结构定义 - 显式设置opcode以提高性能和避免冲突
message(0x7e8764ef) Increment {
    amount: Int as uint32;
}

message(0x9853c6a0) Decrement {
    amount: Int as uint32;
}

message(0x6d4ac8b2) Reset {
}

// Counter合约 - 使用自定义部署逻辑替代Deployable trait
contract Counter {
    // 状态变量
    counter: Int as uint64;
    owner: Address;

    // 初始化函数
    init(owner: Address) {
        self.counter = 0;
        self.owner = owner;
    }

    // 接收Increment消息
    receive(msg: Increment) {
        // 输入验证 - 防止过大的数值导致溢出
        require(msg.amount > 0, "Amount must be positive");
        require(msg.amount <= 1000000, "Amount too large");

        // 检查溢出
        let newValue: Int = self.counter + msg.amount;
        require(newValue >= self.counter, "Counter overflow");

        self.counter = newValue;

        // 使用notify而不是reply来节省gas
        self.notify("Counter incremented".asComment());
    }

    // 接收Decrement消息
    receive(msg: Decrement) {
        // 输入验证
        require(msg.amount > 0, "Amount must be positive");
        require(msg.amount <= 1000000, "Amount too large");

        // 确保不会变成负数
        if (self.counter >= msg.amount) {
            self.counter -= msg.amount;
        } else {
            self.counter = 0;
        }

        // 使用notify而不是reply来节省gas
        self.notify("Counter decremented".asComment());
    }

    // 接收Reset消息（仅owner可调用）
    receive(msg: Reset) {
        // 验证发送者是owner
        require(sender() == self.owner, "Only owner can reset");

        self.counter = 0;
        // 使用notify而不是reply来节省gas
        self.notify("Counter reset".asComment());
    }

    // 自定义部署处理 - 替代Deployable trait以获得更好的性能
    receive(msg: Deploy) {
        // 简单的部署确认，不需要复杂的逻辑
        // 这样可以减少gas消耗
    }

    // 处理空消息 - 用于接收TON而不执行任何操作
    receive() {
        // 允许合约接收TON，但不做任何操作
        // 这对于向合约发送资金很有用
    }

    // Getter函数：获取当前计数值
    get fun counter(): Int {
        return self.counter;
    }

    // Getter函数：获取owner地址
    get fun owner(): Address {
        return self.owner;
    }

    // Getter函数：获取合约余额
    get fun balance(): Int {
        return myBalance();
    }
}
