import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import { GeneratedAdPack } from './schemas/ugc-schema';

export interface ProductConfig {
  name: string;
  brand?: string;
  category?: string;
  price?: string;
  coreProblem?: string;
  coreResult?: string;
  keyIngredient?: string;
  targetPersona?: string;
  platform?: string;
  tone?: string;
}

// Generates the unified raw markdown text
export function getUgcMarkdown(adPack: GeneratedAdPack, product: ProductConfig): string {
  const brandName = product.brand || 'Our Brand';
  const prodName = product.name || 'Product';
  return `# UGC AD CONTENT PACK: ${brandName} - ${prodName}
Generated on: ${new Date().toLocaleDateString()}
Platform Focus: ${product.platform?.toUpperCase().replace('_', ' ') || 'Social Feed'}
Tone Context: ${product.tone || 'Relatable'}

========================================================================
1. SCROLL-STOPPING HOOKS
========================================================================
${adPack.hooks.map((h, i) => `${i + 1}. [${h.type.toUpperCase().replace('_', ' ')}]
   Hook Text: "${h.text}"
   Behavioral Trigger: ${h.rationale}`).join('\n\n')}

========================================================================
2. CONSOLIDATED UGC VIDEO SCRIPT
========================================================================
Duration: ~${adPack.script.estimated_duration_seconds}s
Length: ${adPack.script.word_count} words

[SCRIPT BREAKDOWN]
- HOOK [0-3s]:
  ${adPack.script.hook}

- PROBLEM [3-8s]:
  ${adPack.script.problem}

- AGITATE [8-18s]:
  ${adPack.script.agitate}

- SOLUTION [18-35s]:
  ${adPack.script.solution}

- PROOF [35-45s]:
  ${adPack.script.proof}

- CTA [45-55s]:
  ${adPack.script.cta}

------------------------------------------------------------------------
FULL CONTINUOUS SCRIPT (Ready for Teleprompter or Text-to-Speech):
------------------------------------------------------------------------
${adPack.script.full_script}

========================================================================
3. CALL TO ACTION (CTA) VARIANTS
========================================================================
${adPack.ctas.map((c, i) => `${i + 1}. [${c.stage.toUpperCase().replace('_', ' ')}]
   CTA Text: "${c.text}"
   Ideal Segment: ${c.use_case}`).join('\n\n')}

========================================================================
4. COPY / SOCIAL CAPTION VARIANTS
========================================================================
${adPack.captions.map((caption, i) => `--- VARIANT ${i + 1}: ${caption.type.toUpperCase().replace('_', ' ')} ---
${caption.text}

Hashtags: ${caption.hashtags.join(' ')}`).join('\n\n')}
`;
}

// Download file helper (Client-side)
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Exports separate txt assets grouped in a premium structured ZIP file
export async function downloadZipArchive(adPack: GeneratedAdPack, product: ProductConfig) {
  const zip = new JSZip();
  const folderName = `ugc_campaign_${(product.name || 'campaign').toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
  const campaignFolder = zip.folder(folderName);
  
  if (!campaignFolder) return;

  // 1. Hooks Txt
  let hooksContent = `SCROLL-STOPPING HOOKS\nCampaign: ${product.brand} - ${product.name}\n\n`;
  adPack.hooks.forEach((h, i) => {
    hooksContent += `${i + 1}. [${h.type.toUpperCase().replace('_', ' ')}]\n   Hook: "${h.text}"\n   Trigger rationale: ${h.rationale}\n\n`;
  });
  campaignFolder.file('01_scroll_hooks.txt', hooksContent.trim());

  // 2. Script Txt
  let scriptContent = `UGC AD VIDEO SCRIPT\nCampaign: ${product.brand} - ${product.name}\n`;
  scriptContent += `Duration: ~${adPack.script.estimated_duration_seconds}s | Word Count: ${adPack.script.word_count} words\n\n`;
  scriptContent += `--- SCRIPT BREAKDOWN ---\n`;
  scriptContent += `[0-3s]   HOOK:\n${adPack.script.hook}\n\n`;
  scriptContent += `[3-8s]   PROBLEM:\n${adPack.script.problem}\n\n`;
  scriptContent += `[8-18s]  AGITATE:\n${adPack.script.agitate}\n\n`;
  scriptContent += `[18-35s] SOLUTION:\n${adPack.script.solution}\n\n`;
  scriptContent += `[35-45s] PROOF:\n${adPack.script.proof}\n\n`;
  scriptContent += `[45-55s] CTA:\n${adPack.script.cta}\n\n`;
  scriptContent += `------------------------------------------------------------\n`;
  scriptContent += `FULL TELEPROMPTER COPY:\n${adPack.script.full_script}\n`;
  campaignFolder.file('02_video_script.txt', scriptContent.trim());

  // 3. CTAs Txt
  let ctasContent = `UGC CALL TO ACTION (CTA) VARIANTS\nCampaign: ${product.brand} - ${product.name}\n\n`;
  adPack.ctas.forEach((c, i) => {
    ctasContent += `${i + 1}. [${c.stage.toUpperCase()}]\n   Text: "${c.text}"\n   Target Segment: ${c.use_case}\n\n`;
  });
  campaignFolder.file('03_call_to_actions.txt', ctasContent.trim());

  // 4. Captions Txt
  let captionsContent = `SOCIAL MEDIA CAPTIONS & HASHTAGS\nCampaign: ${product.brand} - ${product.name}\n\n`;
  adPack.captions.forEach((c, i) => {
    captionsContent += `--- Variant ${i + 1}: ${c.type.toUpperCase()} ---\n${c.text}\n\nHashtags:\n${c.hashtags.join(' ')}\n\n`;
  });
  campaignFolder.file('04_social_captions.txt', captionsContent.trim());

  // 5. Consolidated Markdown
  const markdownContent = getUgcMarkdown(adPack, product);
  campaignFolder.file('full_campaign_ad_pack.md', markdownContent);

  // Generate and download zip blob
  const contentBlob = await zip.generateAsync({ type: 'blob' });
  downloadBlob(contentBlob, `${folderName}_campaign_assets.zip`);
}

// Exports beautiful structured PDF report containing campaigns and guidelines text assets
export function downloadPdfReport(adPack: GeneratedAdPack, product: ProductConfig) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  let currentY = 20;

  // Helper: check page limit & append new page if needed
  const ensureSpace = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - margin) {
      doc.addPage();
      currentY = 20;
      drawPageBorder();
    }
  };

  // Border & Header helper
  const drawPageBorder = () => {
    doc.setDrawColor(241, 245, 249); // slate-100 equivalent
    doc.setLineWidth(0.5);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

    // Accent line at the very top of each page border
    doc.setFillColor(37, 99, 235); // blue-600
    doc.rect(10, 10, pageWidth - 20, 2, 'F');
  };

  // Draw first page border
  drawPageBorder();

  // Draw Header Block
  doc.setFillColor(15, 23, 42); // slate-900 background for cover header
  doc.rect(12, 14, pageWidth - 24, 38, 'F');

  // Title text inside slate block
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('UGC STUDIO  |  CAMPAIGN ASSETS', 18, 25);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(`Generated: ${new Date().toLocaleDateString()}  •  Generator Hub v1.1.0`, 18, 30);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(96, 165, 250); // blue-400
  const campaignTitle = `${(product.brand || 'Brand').toUpperCase()} — ${product.name || 'Product'}`;
  doc.text(campaignTitle, 18, 41);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225); // slate-300
  const metaDetail = `Platform: ${product.platform?.toUpperCase().replace('_', ' ') || 'Any'}  |  Price context: ${product.price || 'N/A'}  |  Tone: ${product.tone || 'Relatable'}`;
  doc.text(metaDetail, 18, 46);

  currentY = 62;

  // Section 1: Scroll-Stopping Hooks
  ensureSpace(20);
  doc.setFillColor(37, 99, 235); // blue-600
  doc.rect(margin, currentY, 4, 6, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('1. SCROLL-STOPPING HOOKS', margin + 6, currentY + 5);
  currentY += 12;

  adPack.hooks.forEach((hook, i) => {
    // Determine heights of hooks text wrap
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    const typeLabel = `${i + 1}. [${hook.type.toUpperCase().replace('_', ' ')}]`;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const hookLines = doc.splitTextToSize(`"${hook.text}"`, contentWidth - 10);
    
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    const rationaleLines = doc.splitTextToSize(`Behavior Trigger: ${hook.rationale}`, contentWidth - 15);

    const neededBlockHeight = 4 + (hookLines.length * 5) + 3 + (rationaleLines.length * 4.5) + 8;
    ensureSpace(neededBlockHeight);

    // Render hook box backing
    doc.setFillColor(248, 250, 252); // slate-50
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.rect(margin, currentY, contentWidth, neededBlockHeight - 4, 'FD');

    // Accent line left of each hook card
    doc.setFillColor(96, 165, 250); // light blue accent
    doc.rect(margin, currentY, 1.5, neededBlockHeight - 4, 'F');

    let boxY = currentY + 5;
    
    // Label
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(37, 99, 235); // blue-600
    doc.text(typeLabel, margin + 4, boxY);
    boxY += 5;

    // Body
    doc.setTextColor(15, 23, 42); // slate-900
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    hookLines.forEach((line: string) => {
      doc.text(line, margin + 4, boxY);
      boxY += 5;
    });
    boxY -= 1;

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.line(margin + 4, boxY, margin + contentWidth - 4, boxY);
    boxY += 4.5;

    // Rationale
    doc.setTextColor(100, 116, 139); // slate-500
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    rationaleLines.forEach((line: string) => {
      doc.text(line, margin + 6, boxY);
      boxY += 4.5;
    });

    currentY += neededBlockHeight;
  });

  currentY += 10;

  // Section 2: Unified Video Script
  ensureSpace(20);
  doc.setFillColor(37, 99, 235); // blue-600
  doc.rect(margin, currentY, 4, 6, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('2. CONSOLIDATED AD VIDEO SCRIPT', margin + 6, currentY + 5);
  currentY += 12;

  // script specs card
  ensureSpace(15);
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, currentY, contentWidth, 10, 'FD');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(`Duration: ~${adPack.script.estimated_duration_seconds} seconds`, margin + 6, currentY + 6.5);
  doc.text(`Word count: ${adPack.script.word_count} words`, margin + contentWidth / 2 + 10, currentY + 6.5);
  
  currentY += 16;

  // Script sections list
  const scriptStages = [
    { label: '[0-3s] HOOK', val: adPack.script.hook },
    { label: '[3-8s] PROBLEM', val: adPack.script.problem },
    { label: '[8-18s] AGITATE', val: adPack.script.agitate },
    { label: '[18-35s] SOLUTION', val: adPack.script.solution },
    { label: '[35-45s] PROOF', val: adPack.script.proof },
    { label: '[45-55s] CTA', val: adPack.script.cta },
  ];

  scriptStages.forEach((stage) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    const labelLines = doc.splitTextToSize(stage.label, 40);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const textLines = doc.splitTextToSize(stage.val, contentWidth - 45);

    const neededStageHeight = Math.max(labelLines.length * 5, textLines.length * 5) + 6;
    ensureSpace(neededStageHeight);

    // Accent backing on hover effect equivalents
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(241, 245, 249);
    doc.rect(margin, currentY, contentWidth, neededStageHeight, 'F');
    
    // Label text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(37, 99, 235);
    doc.text(stage.label, margin + 2, currentY + 5.5);

    // Content text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85); // slate-700
    let textCursor = currentY + 5.5;
    textLines.forEach((line: string) => {
      doc.text(line, margin + 42, textCursor);
      textCursor += 5;
    });

    // horizontal hairline spacer
    doc.setDrawColor(241, 245, 249);
    doc.line(margin, currentY + neededStageHeight, margin + contentWidth, currentY + neededStageHeight);

    currentY += neededStageHeight + 2;
  });

  currentY += 10;

  // Continuous Teleprompter layout
  ensureSpace(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('CONTINUOUS TELEPROMPTER READ:', margin, currentY);
  currentY += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  
  const formattedScriptText = doc.splitTextToSize(adPack.script.full_script, contentWidth);
  const totalScriptBlockHeight = (formattedScriptText.length * 4.5) + 8;
  ensureSpace(totalScriptBlockHeight);

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, currentY, contentWidth, totalScriptBlockHeight - 4, 'FD');

  let scriptTextCursor = currentY + 5;
  formattedScriptText.forEach((line: string) => {
    doc.text(line, margin + 4, scriptTextCursor);
    scriptTextCursor += 4.5;
  });

  currentY += totalScriptBlockHeight + 10;

  // Section 3: Call to Action (CTA) variants
  ensureSpace(30);
  doc.setFillColor(37, 99, 235); // blue-600
  doc.rect(margin, currentY, 4, 6, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('3. CALL TO ACTION (CTA) VARIANTS', margin + 6, currentY + 5);
  currentY += 12;

  adPack.ctas.forEach((cta, i) => {
    // estimate layouts
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    const titleLabel = `${i + 1}. [${cta.stage.toUpperCase()}]`;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    const mainText = `"${cta.text}"`;
    const ctaMainLines = doc.splitTextToSize(mainText, contentWidth - 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const specLines = doc.splitTextToSize(`Best Funnel Intent Match: ${cta.use_case}`, contentWidth - 10);

    const cardHeight = 4 + 4 + (ctaMainLines.length * 5) + (specLines.length * 4.5) + 6;
    ensureSpace(cardHeight);

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, currentY, contentWidth, cardHeight - 2, 'D');

    // Blue corner indicator
    doc.setFillColor(37, 99, 235);
    doc.rect(margin, currentY, 1.5, cardHeight - 2, 'F');

    let ctaCursor = currentY + 5;
    
    // label
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(37, 99, 235);
    doc.text(titleLabel, margin + 4, ctaCursor);
    ctaCursor += 5;

    // text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    ctaMainLines.forEach((line: string) => {
      doc.text(line, margin + 4, ctaCursor);
      ctaCursor += 5;
    });

    ctaCursor -= 1;
    // use case
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    specLines.forEach((line: string) => {
      doc.text(line, margin + 4, ctaCursor);
      ctaCursor += 4.5;
    });

    currentY += cardHeight;
  });

  currentY += 10;

  // Section 4: Copy / Social Captions
  ensureSpace(25);
  doc.setFillColor(37, 99, 235); // blue-600
  doc.rect(margin, currentY, 4, 6, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('4. COPY & SOCIAL CAPTIONS', margin + 6, currentY + 5);
  currentY += 12;

  adPack.captions.forEach((cap, i) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    const headerLabel = `VARIANT ${i + 1}: ${cap.type.toUpperCase().replace('-', ' ')}`;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const capBodyLines = doc.splitTextToSize(cap.text, contentWidth - 10);

    const hashtagsText = cap.hashtags.join(' ');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    const hashtagsLines = doc.splitTextToSize(hashtagsText, contentWidth - 10);

    const neededCapHeight = 5 + 4 + (capBodyLines.length * 4.5) + 4 + (hashtagsLines.length * 4) + 8;
    ensureSpace(neededCapHeight);

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, currentY, contentWidth, neededCapHeight - 4, 'FD');

    let capCursor = currentY + 5;

    // header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(37, 99, 235);
    doc.text(headerLabel, margin + 4, capCursor);
    capCursor += 5;

    // body
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    capBodyLines.forEach((line: string) => {
      doc.text(line, margin + 4, capCursor);
      capCursor += 4.5;
    });

    capCursor += 1;
    doc.setDrawColor(241, 245, 249);
    doc.line(margin + 4, capCursor, margin + contentWidth - 4, capCursor);
    capCursor += 4.5;

    // tags
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(96, 165, 250);
    hashtagsLines.forEach((line: string) => {
      doc.text(line, margin + 4, capCursor);
      capCursor += 4;
    });

    currentY += neededCapHeight;
  });

  // Save/Download PDF document
  const formattedFilename = `ugc_studio_pack_${(product.name || 'campaign').toLowerCase().replace(/[^a-z0-9]+/g, '_')}.pdf`;
  doc.save(formattedFilename);
}
