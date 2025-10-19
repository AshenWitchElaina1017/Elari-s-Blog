# API 配置说明

## 安全注意事项

⚠️ **重要**：请勿将您的真实API密钥提交到版本控制系统（如Git）。

## 配置步骤

1. **复制环境变量模板**：
   ```bash
   cp .env.example .env
   ```

2. **编辑 .env 文件**：
   将 `VITE_API_KEY=your_actual_api_key_here` 替换为您的真实API密钥。

3. **确保 .env 文件被忽略**：
   请检查项目根目录的 `.gitignore` 文件是否包含以下内容：
   ```
   # Environment variables
   .env
   .env.local
   .env.*.local
   ```

## 环境变量说明

- `VITE_API_URL`: API端点地址
- `VITE_API_KEY`: 您的API密钥
- `VITE_MODEL`: 使用的AI模型

## 使用不同环境的配置

您可以为不同环境创建不同的配置文件：
- `.env.development` - 开发环境
- `.env.production` - 生产环境

## 获取API密钥

请访问相应的API提供商网站获取您的API密钥。

## 故障排除

如果遇到401错误，请检查：
1. API密钥是否正确
2. API密钥是否有效
3. 是否有足够的额度

如果遇到429错误，请检查：
1. 是否超出了请求频率限制
2. 是否有足够的API配额