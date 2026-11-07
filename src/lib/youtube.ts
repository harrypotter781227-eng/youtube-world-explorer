/**
 * Parses ISO 8601 duration strings like "PT4M13S", "PT58S", "PT1H2M30S"
 */
export function parseIsoDuration(durationStr: string): {
  formatted: string;
  totalSeconds: number;
  isShort: boolean;
} {
  if (!durationStr) {
    return { formatted: '0:00', totalSeconds: 0, isShort: false };
  }

  const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) {
    return { formatted: '0:00', totalSeconds: 0, isShort: false };
  }

  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const isShort = totalSeconds > 0 && totalSeconds <= 60;

  let formatted = '';
  if (hours > 0) {
    formatted = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    formatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  return { formatted, totalSeconds, isShort };
}

/**
 * Formats a view count into compact readable string (e.g., 1.2M, 450K)
 */
export function formatViewCount(views: number): string {
  if (!views || views === 0) return '0 views';
  if (views >= 1_000_000_000) {
    return `${(views / 1_000_000_000).toFixed(1)}B views`;
  }
  if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)}M views`;
  }
  if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1)}K views`;
  }
  return `${views.toLocaleString()} views`;
}

/**
 * Formats relative time (e.g. "3 hours ago", "2 days ago")
 */
export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    }
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    }
    if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`;
    }
    if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks}w ago`;
    }
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months}mo ago`;
  } catch {
    return 'Recently';
  }
}

