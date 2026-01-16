/**
 * Test file for cache functionality
 * This demonstrates how the cache system works
 */

import { apiCache, cacheKeys } from './cache';

// Mock data for testing
const mockArticles = [
  { _id: '1', title: 'Test Article 1', content: 'Content 1' },
  { _id: '2', title: 'Test Article 2', content: 'Content 2' }
];

// Test basic cache functionality
console.log('Testing Cache System...');

// Test setting and getting data
console.log('\n1. Testing basic cache set/get:');
apiCache.set('test-key', mockArticles);
const cachedData = apiCache.get('test-key');
console.log('Retrieved from cache:', !!cachedData);

// Test cache expiration (set TTL to 1 second for testing)
console.log('\n2. Testing cache expiration:');
apiCache.set('expiring-key', 'will expire soon', 1000); // 1 second TTL
console.log('Immediately after set - exists:', !!apiCache.get('expiring-key'));

// Wait 2 seconds then check again
setTimeout(() => {
  console.log('After 2 seconds - exists:', !!apiCache.get('expiring-key'));
}, 2000);

// Test cache invalidation
console.log('\n3. Testing cache invalidation:');
apiCache.set('articles:test-id', { id: 'test-id', title: 'Test' });
apiCache.set('articles:another-id', { id: 'another-id', title: 'Another' });
console.log('Before invalidation - articles:test-id exists:', !!apiCache.get('articles:test-id'));
console.log('Before invalidation - articles:another-id exists:', !!apiCache.get('articles:another-id'));

apiCache.invalidate('articles:*');
console.log('After invalidation - articles:test-id exists:', !!apiCache.get('articles:test-id'));
console.log('After invalidation - articles:another-id exists:', !!apiCache.get('articles:another-id'));

// Test cache keys utility
console.log('\n4. Testing cache keys utility:');
console.log('Articles published key:', cacheKeys.articles.published());
console.log('Article by ID key:', cacheKeys.articles.byId('some-id'));
console.log('Projects all key:', cacheKeys.projects.all());
console.log('Project by ID key:', cacheKeys.projects.byId('some-project-id'));

console.log('\nCache system test completed!');
console.log('Cache stats:', apiCache.stats());

export {};