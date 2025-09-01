# 🚀 快速开始 - 5分钟部署到测试网

## 步骤1: 获取测试币 (2分钟)

### 方法A: 使用Telegram Bot (推荐)
1. 打开 [@testgiver_ton_bot](https://t.me/testgiver_ton_bot)
2. 发送命令 `/start`
3. 发送你的钱包地址 (从Tonkeeper等钱包复制)
4. 等待接收测试币

## 步骤2: 配置环境 (1分钟)

在项目根目录创建 `.env` 文件:

```bash
# 创建环境变量文件
cat > .env << 'EOF'
WALLET_MNEMONIC="你的助记词放在这里"
WALLET_VERSION="v4R2"
EOF
```

**重要**: 
- 替换 `"你的助记词放在这里"` 为你的实际助记词
- 助记词用双引号包围，单词间用空格分隔
- WALLET_VERSION 通常使用 "v4R2"，这是最新的钱包版本

## 步骤3: 部署合约 (2分钟)

```bash
# 1. 安装依赖 (如果还没有)
pnpm install

# 2. 编译合约
pnpm run build

# 3. 部署到测试网
pnpm run deploy
```

## 成功部署后你会看到:

```
🚀 开始部署Counter合约到TON测试网络...

👤 部署者地址: EQBGhqLAZseEqRXz4ByFPTGV7SVMlI4hrbs-Sps_Xzx01x8G
📄 创建合约实例...
📍 预计合约地址: EQC4Ht8...
⏳ 正在部署Counter合约...
💸 部署费用: 0.05 TON
📤 部署交易已发送
⏳ 等待交易确认...

✅ Counter合约部署成功!
🎯 合约地址: EQC4Ht8...
👑 Owner地址: EQBGhqLAZ...
🔍 浏览器查看: https://testnet.tonscan.org/address/EQC4Ht8...

📊 验证部署状态:
  ✓ 当前计数器值: 0
  ✓ 合约Owner: EQBGhqLAZ...
  ✓ 合约余额: 0.0450 TON

🎉 合约部署并验证成功!
```

## 步骤4: 与合约交互

```bash
npm run interact
```

这会启动交互界面，你可以:
- 查看计数器当前值
- 增加计数器
- 减少计数器  
- 重置计数器 (仅owner)

## 🔧 常见问题

### 1. "余额不足" 错误
- 确保钱包有至少 0.1 TON 测试币
- 重新从水龙头获取测试币

### 2. "助记词无效" 错误
- 检查助记词拼写和顺序
- 确保使用双引号包围
- 验证是测试网钱包的助记词

### 3. 部署超时
- 检查网络连接
- 稍等几分钟后重试
- 测试网有时会比较慢

## 🎯 下一步

部署成功后，你可以:

1. **在浏览器中查看合约**
   - 复制合约地址
   - 访问 https://testnet.tonscan.org/
   - 搜索你的合约地址

2. **使用其他钱包与合约交互**
   - 向合约地址发送消息
   - 测试不同的操作

3. **修改合约代码**
   - 编辑 `contracts/counter.tact`
   - 重新编译和部署
   - 测试新功能

4. **部署到主网**
   - 获得真实的TON币
   - 更改配置为主网
   - 小心操作，主网交易不可逆

祝你部署成功! 🎉
