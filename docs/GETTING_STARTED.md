# 快速开始指南

本指南将带你一步步完成TON Counter智能合约的开发、测试和部署。

## 🔧 环境准备

### 1. 安装Node.js
确保你已安装Node.js (版本 >= 16):
```bash
node --version
npm --version
```

### 2. 克隆或下载项目
```bash
cd ton_counter
```

### 3. 安装依赖
```bash
npm install
```

## 📝 开发流程

### 步骤1: 编译合约
```bash
npm run build
```

这会：
- 编译Tact合约为TVM字节码
- 生成TypeScript包装器
- 在`build/`目录创建输出文件

### 步骤2: 运行测试
```bash
npm test
```

测试将验证：
- 合约部署
- 所有功能正常工作
- 边界条件和安全性

### 步骤3: 准备部署

#### 创建钱包
如果你还没有TON钱包：
1. 下载TON Wallet或Tonkeeper
2. 创建新钱包并备份助记词
3. 切换到测试网
4. 从测试网水龙头获取测试TON

#### 配置环境变量
创建`.env`文件：
```bash
TON_NETWORK=testnet
DEPLOYER_MNEMONIC="你的 12 或 24 个单词助记词"
```

### 步骤4: 部署合约
```bash
npm run deploy
```

部署成功后，你会看到：
- 合约地址
- 部署交易信息
- 初始状态验证

### 步骤5: 与合约交互
```bash
npm run interact
```

这会启动交互式界面，你可以：
- 查看当前计数器值
- 发送增加/减少消息
- 重置计数器（如果你是owner）

## 🎯 常见用例

### 发送Increment消息
```typescript
await counter.send(
    sender,
    { value: toNano('0.01') },
    { $$type: 'Increment', amount: 10n }
);
```

### 查询计数器值
```typescript
const value = await counter.getCounter();
console.log('计数器值:', value.toString());
```

### 重置计数器（仅owner）
```typescript
await counter.send(
    sender,
    { value: toNano('0.01') },
    { $$type: 'Reset' }
);
```

## 🔍 故障排除

### 编译错误
- 检查Tact语法
- 确保所有依赖已安装
- 查看编译器输出的详细错误信息

### 测试失败
- 确保合约编译成功
- 检查测试逻辑
- 验证测试环境配置

### 部署失败
- 检查网络连接
- 确保钱包有足够余额
- 验证助记词正确
- 检查网络配置（testnet/mainnet）

### 交互问题
- 确保合约已正确部署
- 检查合约地址
- 验证发送者有足够TON支付gas费用

## 📚 下一步

现在你已经成功运行了Counter合约，可以尝试：

1. **修改合约功能**
   - 添加新的消息类型
   - 实现更复杂的逻辑
   - 添加新的状态变量

2. **扩展测试**
   - 添加更多边界测试
   - 测试gas消耗
   - 性能测试

3. **部署到主网**
   - 在测试网充分测试后
   - 更新配置为mainnet
   - 使用真实TON进行部署

4. **构建前端界面**
   - 使用TON Connect集成钱包
   - 创建Web界面与合约交互
   - 实现实时状态更新

## 💡 最佳实践

- 总是先在测试网测试
- 保持合约逻辑简单清晰
- 编写全面的测试用例
- 使用适当的gas费用
- 定期备份钱包助记词
- 遵循TON开发最佳实践

祝你开发愉快！🚀
