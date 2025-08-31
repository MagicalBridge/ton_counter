# TON Counter 智能合约

一个基于TON区块链使用Tact语言开发的简单计数器智能合约项目。

## 📋 项目概述

这个项目展示了如何使用Tact语言从零开始构建、测试和部署TON智能合约。Counter合约实现了基本的计数器功能，包括增加、减少和重置计数器的操作。

## ✨ 功能特性

- **增加计数器**: 通过发送`Increment`消息增加计数器值
- **减少计数器**: 通过发送`Decrement`消息减少计数器值（不会低于0）
- **重置计数器**: 仅合约owner可以将计数器重置为0
- **查询功能**: 获取当前计数器值、owner地址和合约余额
- **安全性**: 包含owner验证和边界检查

## 🏗️ 项目结构

```
ton_counter/
├── contracts/
│   └── counter.tact          # 主合约文件
├── scripts/
│   ├── deploy.ts             # 部署脚本
│   └── interact.ts           # 交互脚本
├── tests/
│   └── Counter.test.ts       # 测试文件
├── wrappers/
│   └── Counter.compile.ts    # 编译配置
├── build/                    # 编译输出目录
├── package.json              # 项目依赖
├── tsconfig.json             # TypeScript配置
├── jest.config.js            # 测试配置
└── README.md                 # 项目说明
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 编译合约

```bash
npm run build
```

### 3. 运行测试

```bash
npm test
```

### 4. 部署合约

首先创建`.env`文件（参考`.env.example`）：

```bash
# 复制环境变量模板
cp .env.example .env
```

编辑`.env`文件，填入你的钱包助记词：

```
TON_NETWORK=testnet
DEPLOYER_MNEMONIC="your twelve or twenty four word mnemonic phrase here"
```

然后部署合约：

```bash
npm run deploy
```

### 5. 与合约交互

```bash
npm run interact
```

## 📖 合约接口

### 消息类型

#### Increment
增加计数器值
```typescript
{
    $$type: 'Increment',
    amount: bigint  // 要增加的数量
}
```

#### Decrement  
减少计数器值
```typescript
{
    $$type: 'Decrement',
    amount: bigint  // 要减少的数量
}
```

#### Reset
重置计数器（仅owner可调用）
```typescript
{
    $$type: 'Reset'
}
```

### Getter函数

#### getCounter()
返回当前计数器值
```typescript
async getCounter(): Promise<bigint>
```

#### getOwner()
返回合约owner地址
```typescript
async getOwner(): Promise<Address>
```

#### getBalance()
返回合约余额
```typescript
async getBalance(): Promise<bigint>
```

## 🧪 测试用例

项目包含全面的测试用例，覆盖以下场景：

- ✅ 合约正确部署
- ✅ 计数器增加功能
- ✅ 计数器减少功能
- ✅ 防止计数器变为负数
- ✅ owner重置功能
- ✅ 非owner无法重置
- ✅ 多操作组合测试
- ✅ 余额跟踪测试

运行测试：
```bash
npm test
```

查看测试覆盖率：
```bash
npm test -- --coverage
```

## 💡 使用示例

### JavaScript/TypeScript中的使用

```typescript
import { Counter } from './build/Counter/tact_Counter';
import { toNano } from '@ton/core';

// 连接到已部署的合约
const counter = provider.open(Counter.fromAddress(contractAddress));

// 增加计数器
await counter.send(
    sender,
    { value: toNano('0.01') },
    { $$type: 'Increment', amount: 5n }
);

// 查询当前值
const currentValue = await counter.getCounter();
console.log('当前计数器值:', currentValue.toString());
```

## 🔧 开发工具

### 编译
```bash
npm run build
```

### 测试
```bash
npm test
```

### 部署到测试网
```bash
npm run deploy
```

### 与合约交互
```bash
npm run interact
```

## 📝 合约代码解析

### 状态变量
- `counter: Int as uint64` - 计数器值，使用64位无符号整数
- `owner: Address` - 合约拥有者地址

### 消息处理
合约使用Tact的消息系统处理不同类型的操作请求，每个操作都会发送确认回复。

### 安全特性
- Owner验证：只有owner可以重置计数器
- 边界检查：防止计数器变为负数
- 消息回复：每个操作都有确认反馈

## 🌐 网络配置

### 测试网部署
- 网络: TON Testnet
- 浏览器: https://testnet.tonscan.org/
- 水龙头: https://t.me/testgiver_ton_bot

### 主网部署
- 网络: TON Mainnet  
- 浏览器: https://tonscan.org/

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

MIT License

## 🔗 相关链接

- [TON 官方文档](https://docs.ton.org/)
- [Tact 语言文档](https://docs.tact-lang.org/)
- [TON Blueprint](https://github.com/ton-org/blueprint)
- [TON 开发者社区](https://t.me/tondev_eng)
