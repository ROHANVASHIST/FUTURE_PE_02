export const PLATFORM_MAP = {
  instagram: {
    maxDuration: 60,
    idealDuration: 30,
    hookWindowSeconds: 3,
    aspectRatio: '9:16',
    captionStyle: 'casual + emoji-friendly',
    notes: 'Trending audio hooks perform better than spoken. First 2 words on screen matter most.',
  },
  youtube_shorts: {
    maxDuration: 60,
    idealDuration: 45,
    hookWindowSeconds: 5,
    aspectRatio: '9:16',
    captionStyle: 'slightly more detail tolerated',
    notes: 'Longer problem-agitation section performs well. Viewer intent is higher.',
  },
  meta_feed: {
    maxDuration: 30,
    idealDuration: 15,
    hookWindowSeconds: 2,
    aspectRatio: '1:1 or 4:5',
    captionStyle: 'benefit-first, concise',
    notes: 'Sound-off optimised. On-screen text carries full message. CTA must be above fold.',
  },
};
