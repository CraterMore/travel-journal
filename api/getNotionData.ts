import { Client } from "@notionhq/client";
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize the Notion client
const notion = new Client({ auth: process.env.NOTION_KEY });

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const { databaseId } = req.query;

        if (!databaseId) {
            return res.status(400).json({ error: 'Database ID is required' });
        }

        const response = await notion.databases.query({
            database_id: databaseId as string,
            sorts: [
                {
                    property: 'Visited',
                    direction: 'descending',
                }
            ],
            filter: {
                property: 'Visited',
                date: {
                    is_not_empty: true
                }
            }
        });

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data from Notion' });
    }
}
