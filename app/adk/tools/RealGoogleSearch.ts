import { BaseTool, ToolContext } from "@iqai/adk";

export class RealGoogleSearch extends BaseTool {
  name = "GoogleSearch";
  description = "Performs real Google searches using the Custom Search API";

  constructor() {
    super({
      name: "GoogleSearch",
      description: "Performs real Google searches using the Custom Search API",
    });
  }

  async runAsync(args: { query: string; num_results?: number }, _context: ToolContext) {
    const apiKey = process.env.GOOGLE_SEARCH_KEY;
    const cseId = process.env.GOOGLE_CSE_ID;

    if (!apiKey || !cseId) {
      throw new Error("Missing GOOGLE_SEARCH_KEY or GOOGLE_CSE_ID in environment variables");
    }

    const num = args.num_results || 3;
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
      args.query
    )}&num=${num}&key=${apiKey}&cx=${cseId}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Google Search failed: ${res.statusText}`);

    const data = await res.json();

    const results = (data.items || []).map((item: any) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
    }));

    return {
      query: args.query,
      results,
    };
  }
}
