import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from parent .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '.env.local');
dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Based Components PC Build Generator endpoint
app.post('/api/generate-build', async (req, res) => {
  const { tier } = req.body;

  // Validate input
  if (!tier || !tier.name || !tier.range || !tier.label) {
    return res.status(400).json({ error: 'Missing required tier fields: name, range, label' });
  }

  const apiKey = process.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('VITE_ANTHROPIC_API_KEY not configured');
    return res.status(500).json({ error: 'API key not configured' });
  }

  const systemPrompt = `You are a PC hardware expert for RigNation, a Philippine PC builder store.
You have deep knowledge of current 2024–2025 PC components and their pricing in the Philippine market.
Suggest complete, balanced PC builds tailored to specific use cases and budgets.
Consider performance, value, compatibility, and reliability.`;

  const userPrompt = `You are a PC hardware expert for RigNation, a Philippine PC builder store.
Suggest a complete 2024–2025 PC build for the following tier:

Tier: ${tier.name}
Budget Range: ${tier.range}
Target Use: ${tier.label}

Respond ONLY with valid JSON (no markdown, no extra text):
{
  "cpu": "exact model name",
  "gpu": "exact model name",
  "ram": "exact spec e.g. 16GB DDR4-3200 (2x8GB)",
  "storage": "exact model name",
  "motherboard": "exact model name",
  "psu": "e.g. 650W Seasonic Focus GX-750 Gold",
  "case": "exact model name",
  "total_price_php": "e.g. ₱38,500",
  "power_draw": "e.g. 350W",
  "tier_label": "${tier.name}",
  "explanation": "2-3 sentences on why this build fits the tier and use case"
}`;

  try {
    console.log(`Calling Anthropic API for ${tier.name} tier Based Components build generation...`);
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Anthropic API error (${response.status}):`, errorText);
      throw new Error(`Anthropic API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    // Extract text from Claude's response
    const responseText = data.content[0]?.text;
    if (!responseText) {
      throw new Error('No response from Claude API');
    }

    // Parse the JSON response
    const buildData = JSON.parse(responseText);

    // Validate required fields
    const requiredFields = ['cpu', 'gpu', 'ram', 'storage', 'motherboard', 'psu', 'case', 'total_price_php', 'power_draw', 'tier_label', 'explanation'];
    for (const field of requiredFields) {
      if (!buildData[field]) {
        throw new Error(`Missing required field in API response: ${field}`);
      }
    }

    console.log(`Based Components build generated successfully for ${tier.name} tier`);
    res.json(buildData);
  } catch (error) {
    console.error('Error generating build:', error);

    if (error instanceof SyntaxError) {
      return res.status(500).json({
        error: 'Failed to parse Claude API response. The response may not be in valid JSON format.'
      });
    }

    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to generate build'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`RigNation Server running on http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/generate-build`);
});
