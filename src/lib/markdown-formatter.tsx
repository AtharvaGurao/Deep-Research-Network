import React from 'react';

export interface FormattedContent {
  type: 'heading' | 'paragraph' | 'list' | 'table' | 'text';
  content: string | React.ReactNode;
  level?: number;
  items?: string[];
  headers?: string[];
  rows?: string[][];
}

export function parseMarkdownToComponents(text: string): FormattedContent[] {
  const lines = text.split('\n').filter(line => line.trim());
  const components: FormattedContent[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) {
      i++;
      continue;
    }

    // Handle headings
    if (line.startsWith('**') && line.endsWith('**')) {
      const heading = line.replace(/\*\*/g, '').trim();
      components.push({
        type: 'heading',
        content: heading,
        level: 2
      });
      i++;
      continue;
    }

    // Handle tables
    if (line.includes('|') && !line.startsWith('•')) {
      const tableData = parseTable(lines, i);
      if (tableData.table) {
        components.push(tableData.table);
        i = tableData.nextIndex;
        continue;
      }
    }

    // Handle bullet lists
    if (line.startsWith('•')) {
      const listData = parseList(lines, i);
      components.push(listData.list);
      i = listData.nextIndex;
      continue;
    }

    // Handle regular paragraphs
    const paragraph = cleanMarkdownText(line);
    if (paragraph) {
      components.push({
        type: 'paragraph',
        content: paragraph
      });
    }
    i++;
  }

  return components;
}

function parseTable(lines: string[], startIndex: number): { table: FormattedContent | null; nextIndex: number } {
  let i = startIndex;
  const tableLines: string[] = [];

  // Collect all table lines
  while (i < lines.length && lines[i].trim().includes('|')) {
    const line = lines[i].trim();
    // Skip separator lines like |---|---|---|
    if (!line.match(/^\|[\s\-\|]+\|$/)) {
      tableLines.push(line);
    }
    i++;
  }

  if (tableLines.length < 1) {
    return { table: null, nextIndex: startIndex + 1 };
  }

  // Parse headers and rows
  const headers = tableLines[0]
    .split('|')
    .map(h => h.trim())
    .filter(h => h);

  const rows = tableLines.slice(1).map(line =>
    line.split('|')
      .map(cell => cleanMarkdownText(cell.trim()))
      .filter(cell => cell)
  );

  return {
    table: {
      type: 'table',
      content: '',
      headers,
      rows
    },
    nextIndex: i
  };
}

function parseList(lines: string[], startIndex: number): { list: FormattedContent; nextIndex: number } {
  let i = startIndex;
  const items: string[] = [];

  while (i < lines.length && lines[i].trim().startsWith('•')) {
    const line = lines[i].trim();
    const item = cleanMarkdownText(line.substring(1).trim());
    if (item) {
      items.push(item);
    }
    i++;
  }

  return {
    list: {
      type: 'list',
      content: '',
      items
    },
    nextIndex: i
  };
}

function cleanMarkdownText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
    .replace(/\*(.*?)\*/g, '$1')     // Remove italic markdown
    .replace(/`(.*?)`/g, '$1')       // Remove code markdown
    .trim();
}

export function renderFormattedContent(components: FormattedContent[]): React.ReactNode {
  return components.map((component, index) => {
    switch (component.type) {
      case 'heading':
        return (
          <h3 key={index} className="text-lg font-semibold mt-6 mb-3 text-foreground first:mt-0">
            {component.content}
          </h3>
        );
      
      case 'paragraph':
        return (
          <p key={index} className="mb-3 text-muted-foreground leading-relaxed">
            {component.content}
          </p>
        );
      
      case 'list':
        return (
          <ul key={index} className="mb-4 space-y-2">
            {component.items?.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1.5 text-xs">●</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      
      case 'table':
        return (
          <div key={index} className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse border border-border rounded-lg overflow-hidden">
              {component.headers && (
                <thead>
                  <tr className="bg-muted/50">
                    {component.headers.map((header, headerIndex) => (
                      <th 
                        key={headerIndex}
                        className="border border-border px-3 py-2 text-left font-medium text-foreground text-sm"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {component.rows?.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-muted/30">
                    {row.map((cell, cellIndex) => (
                      <td 
                        key={cellIndex}
                        className="border border-border px-3 py-2 text-sm text-muted-foreground"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      default:
        return null;
    }
  });
}