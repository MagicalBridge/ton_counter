# 部署指南：部署到TON测试网络 

## 步骤1: 准备钱包

1. **下载钱包应用**
   - Tonkeeper: https://tonkeeper.com/
   - 或 TON Wallet: https://wallet.ton.org/

2. **创建新钱包**
   - 打开应用，选择"创建新钱包"
   - **重要**: 记录并安全保存你的助记词（12或24个单词）
   - 设置钱包密码

3. **切换到测试网络**
   - 在钱包设置中找到"网络"选项
   - 选择"Testnet"或"测试网络"

### 步骤2: 获取测试币

1. **使用Telegram Bot**
   - 打开 [@testgiver_ton_bot](https://t.me/testgiver_ton_bot)
   - 发送你的测试网钱包地址
   - 等待接收测试TON币

2. **或使用网页水龙头**
   - 访问 https://testnet.tonscan.org/faucet
   - 输入你的钱包地址
   - 完成验证码
   - 点击获取测试币

## 步骤3: 配置环境

1. **创建环境变量文件**
   ```bash
   # 在项目根目录创建 .env 文件
   touch .env
   ```

2. **编辑 .env 文件，添加以下内容:**
   ```
   TON_NETWORK=testnet
   DEPLOYER_MNEMONIC="你的 12 或 24 个助记词"
   ```

   **注意**: 
   - 助记词用双引号包围
   - 单词之间用空格分隔
   - 确保助记词顺序正确

## 步骤4: 部署合约

1. **确保合约已编译**
   ```bash
   npm run build
   ```

2. **运行部署脚本**
   ```bash
   npm run deploy
   ```

3. **选择部署脚本**
   - 选择 `deploy.ts` 脚本
   - 确认部署参数

## 步骤5: 验证部署

部署成功后，你会看到：
- 合约地址
- 部署交易哈希
- 初始状态验证

你可以在测试网浏览器中查看合约：
- 访问 https://testnet.tonscan.org/
- 搜索你的合约地址

## 🔧 故障排除

### 常见问题

1. **"余额不足"错误**
   - 确保钱包有足够的测试TON币
   - 部署通常需要约0.05 TON

2. **"助记词无效"错误**
   - 检查助记词拼写
   - 确保单词顺序正确
   - 验证是否为测试网钱包的助记词

3. **网络连接问题**
   - 检查网络连接
   - 尝试更换API端点

### 安全提醒

⚠️ **重要安全提醒**:
- 永远不要分享你的助记词
- 不要在主网使用测试网的助记词
- 定期备份你的钱包
- 使用强密码保护钱包

## 📱 交互测试

部署完成后，你可以使用交互脚本测试合约：

```bash
npm run interact
```

这会启动一个交互式界面，让你可以：
- 查看当前计数器值
- 发送增加/减少消息
- 重置计数器（如果你是owner）


➜  ton_counter git:(main) ✗ pnpm run deploy
> ton-counter@1.0.0 deploy /Users/louis/Documents/ton_workspace/ton_counter
> blueprint run

? Choose file to use (Use arrow keys)
? Choose file to use deploy
? Which network do you want to use? 
? Which network do you want to use? testnet
? Which wallet are you using? 
? Which wallet are you using? Mnemonic
Connected to wallet at address: 0QAy9So3qSJNMcmAbF_StNnZxGXX19dNjQDreB1TotMUOdtC
🚀 开始部署Counter合约到TON测试网络...

👤 部署者地址: EQAy9So3qSJNMcmAbF_StNnZxGXX19dNjQDreB1TotMUOT0N
📄 创建合约实例...
📍 预计合约地址: EQB-Y2B1PbXaje5DZ8lYi2jMzyssY61I3iBRBhdcKc7lhzjM
⏳ 正在部署Counter合约...
💸 部署费用: 0.05 TON
Sent transaction
📤 部署交易已发送
⏳ 等待交易确认...
Contract deployed at address kQB-Y2B1PbXaje5DZ8lYi2jMzyssY61I3iBRBhdcKc7lh4NG
You can view it at https://testnet.tonscan.org/address/kQB-Y2B1PbXaje5DZ8lYi2jMzyssY61I3iBRBhdcKc7lh4NG

✅ Counter合约部署成功!
🎯 合约地址: EQB-Y2B1PbXaje5DZ8lYi2jMzyssY61I3iBRBhdcKc7lhzjM
👑 Owner地址: EQAy9So3qSJNMcmAbF_StNnZxGXX19dNjQDreB1TotMUOT0N
🔍 浏览器查看: https://testnet.tonscan.org/address/EQB-Y2B1PbXaje5DZ8lYi2jMzyssY61I3iBRBhdcKc7lhzjM

📊 验证部署状态:
  ✓ 当前计数器值: 0
  ✓ 合约Owner: EQAy9So3qSJNMcmAbF_StNnZxGXX19dNjQDreB1TotMUOT0N
  ✓ 合约余额: 0.0490 TON

🎉 合约部署并验证成功!

📝 接下来你可以:
  1. 运行 npm run interact 与合约交互
  2. 在浏览器中查看合约状态
  3. 使用其他钱包向合约发送消息
