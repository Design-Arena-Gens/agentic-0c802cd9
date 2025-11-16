import { Post, Stats, ClickEvent, Tag } from './types';
import { uid, buildDeepLink } from './utils';

const COMMISSION_RATE = 0.10; // 10% of attributed revenue

// Simple global store (ephemeral) suitable for demo purposes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g: any = globalThis as any;

if (!g.__stylelinkStore) {
  g.__stylelinkStore = {
    posts: [] as Post[],
    stats: {
      clicks: 0,
      clicksByPost: {},
      clicksByAmbassador: {},
      revenueByAmbassadorEur: {},
    } as Stats,
    seeded: false,
  };
}

export type Store = typeof g.__stylelinkStore;

export function getStore(): Store {
  return g.__stylelinkStore as Store;
}

function exampleTags(): Tag[] {
  return [
    {
      id: uid('tag'),
      x: 32,
      y: 40,
      product: {
        id: 'tee-classic',
        name: 'T-shirt Classique Unisexe',
        priceEur: 29.9,
        options: { colors: ['noir', 'blanc', 'bleu'], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
      },
      defaultSelection: { color: 'noir', size: 'M' },
    },
    {
      id: uid('tag'),
      x: 64,
      y: 72,
      product: {
        id: 'hoodie-soft',
        name: 'Hoodie Confort',
        priceEur: 59.9,
        options: { colors: ['gris', 'noir', 'vert'], sizes: ['S', 'M', 'L', 'XL'] },
      },
      defaultSelection: { color: 'gris', size: 'L' },
    },
  ];
}

export function seedOnce() {
  const store = getStore();
  if (store.seeded) return;
  store.posts.push(
    {
      id: uid('post'),
      title: 'Look street minimal',
      imageUrl:
        'https://images.unsplash.com/photo-1503342217505-b0a15cf70489?q=80&w=1600&auto=format&fit=crop',
      author: { id: 'amb_demo', name: 'Ambassadeur Demo' },
      tags: exampleTags(),
      createdAt: new Date().toISOString(),
      refCode: 'amb_demo',
    },
    {
      id: uid('post'),
      title: 'Palette pastel printemps',
      imageUrl:
        'https://images.unsplash.com/photo-1516822003754-cca485356ecb?q=80&w=1600&auto=format&fit=crop',
      author: { id: 'amb_julia', name: 'Julia' },
      tags: exampleTags(),
      createdAt: new Date().toISOString(),
      refCode: 'amb_julia',
    },
  );
  store.seeded = true;
}

export function listPosts(): Post[] {
  seedOnce();
  return getStore().posts;
}

export function getPostById(id: string): Post | undefined {
  seedOnce();
  return getStore().posts.find((p: Post) => p.id === id);
}

export function addPost(p: Omit<Post, 'id' | 'createdAt'>): Post {
  const post: Post = { ...p, id: uid('post'), createdAt: new Date().toISOString() };
  const store = getStore();
  store.posts.unshift(post);
  return post;
}

export function recordClick(evt: ClickEvent): { deepLink: string } {
  const store = getStore();
  const post = getPostById(evt.postId);
  const tag = post?.tags.find(t => t.id === evt.tagId);
  store.stats.clicks += 1;
  store.stats.clicksByPost[evt.postId] = (store.stats.clicksByPost[evt.postId] || 0) + 1;
  store.stats.clicksByAmbassador[evt.ambassadorId] =
    (store.stats.clicksByAmbassador[evt.ambassadorId] || 0) + 1;

  if (tag?.product) {
    const revenue = tag.product.priceEur;
    store.stats.revenueByAmbassadorEur[evt.ambassadorId] =
      (store.stats.revenueByAmbassadorEur[evt.ambassadorId] || 0) + revenue;
  }

  const deepLink = buildDeepLink({
    productId: tag?.product.id,
    color: evt.selection?.color || tag?.defaultSelection?.color,
    size: evt.selection?.size || tag?.defaultSelection?.size,
    ref: evt.ambassadorId,
    post: evt.postId,
    src: 'stylelink',
  });
  return { deepLink };
}

export function getStatsForAmbassador(ambassadorId: string) {
  const s = getStore().stats;
  const clicks = s.clicksByAmbassador[ambassadorId] || 0;
  const revenue = s.revenueByAmbassadorEur[ambassadorId] || 0;
  const commission = revenue * COMMISSION_RATE;
  return { clicks, revenueEur: revenue, estimatedCommissionEur: commission, rate: COMMISSION_RATE };
}
