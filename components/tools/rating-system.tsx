'use client';

import { useState, useEffect } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface Rating {
  id: string;
  toolId: string;
  userId: string;
  username: string;
  rating: number; // 1-5 stars
  review?: string;
  helpful: number;
  notHelpful: number;
  createdAt: string;
  verified?: boolean;
}

interface RatingSystemProps {
  toolId: string;
  toolName: string;
  currentRating?: number;
  totalRatings?: number;
  className?: string;
}

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function StarRating({ rating, onRatingChange, readonly = false, size = 'md' }: StarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const sizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-6 w-6'
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= (hoveredRating || rating);
        
        return (
          <Star
            key={index}
            className={cn(
              sizes[size],
              'transition-colors cursor-pointer',
              isActive 
                ? 'fill-amber-400 text-amber-400' 
                : 'fill-none text-muted-foreground/30',
              readonly && 'cursor-default'
            )}
            onClick={() => !readonly && onRatingChange?.(starValue)}
            onMouseEnter={() => !readonly && setHoveredRating(starValue)}
            onMouseLeave={() => !readonly && setHoveredRating(0)}
          />
        );
      })}
    </div>
  );
}

function RatingBreakdown({ ratings }: { ratings: Rating[] }) {
  const distribution = Array.from({ length: 5 }).map((_, index) => {
    const stars = 5 - index;
    const count = ratings.filter(r => r.rating === stars).length;
    const percentage = ratings.length > 0 ? (count / ratings.length) * 100 : 0;
    
    return { stars, count, percentage };
  });

  return (
    <div className="space-y-2">
      {distribution.map(({ stars, count, percentage }) => (
        <div key={stars} className="flex items-center gap-2 text-sm">
          <span className="w-8">{stars}星</span>
          <div className="flex-1 bg-muted rounded-full h-2">
            <div 
              className="bg-amber-400 h-2 rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="w-8 text-muted-foreground">{count}</span>
        </div>
      ))}
    </div>
  );
}

function ReviewItem({ rating: review, onHelpfulClick }: { rating: Rating; onHelpfulClick: (id: string, helpful: boolean) => void }) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
            {review.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{review.username}</span>
              {review.verified && (
                <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">
                  已验证
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <StarRating rating={review.rating} readonly size="sm" />
              <span className="text-xs text-muted-foreground">
                {new Date(review.createdAt).toLocaleDateString('zh-CN')}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {review.review && (
        <p className="text-sm text-muted-foreground">{review.review}</p>
      )}
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => onHelpfulClick(review.id, true)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ThumbsUp className="h-3 w-3" />
          有用 ({review.helpful})
        </button>
        <button
          onClick={() => onHelpfulClick(review.id, false)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ThumbsDown className="h-3 w-3" />
          无用 ({review.notHelpful})
        </button>
      </div>
    </div>
  );
}

export function RatingSystem({ toolId, toolName, currentRating = 0, totalRatings = 0, className }: RatingSystemProps) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);

  // Load ratings from localStorage (in a real app, this would be from an API)
  useEffect(() => {
    const savedRatings = localStorage.getItem(`ratings-${toolId}`);
    if (savedRatings) {
      setRatings(JSON.parse(savedRatings));
    }
  }, [toolId]);

  const saveRatings = (newRatings: Rating[]) => {
    localStorage.setItem(`ratings-${toolId}`, JSON.stringify(newRatings));
    setRatings(newRatings);
  };

  const calculateAverageRating = () => {
    if (ratings.length === 0) return currentRating;
    return ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;
  };

  const handleSubmitReview = async () => {
    if (userRating === 0) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newRating: Rating = {
      id: Date.now().toString(),
      toolId,
      userId: 'anonymous',
      username: '匿名用户',
      rating: userRating,
      review: userReview.trim() || undefined,
      helpful: 0,
      notHelpful: 0,
      createdAt: new Date().toISOString(),
      verified: false,
    };

    const updatedRatings = [newRating, ...ratings];
    saveRatings(updatedRatings);
    
    setUserRating(0);
    setUserReview('');
    setShowReviewDialog(false);
    setIsSubmitting(false);
  };

  const handleHelpfulClick = (reviewId: string, helpful: boolean) => {
    const updatedRatings = ratings.map(rating => {
      if (rating.id === reviewId) {
        return {
          ...rating,
          helpful: helpful ? rating.helpful + 1 : rating.helpful,
          notHelpful: !helpful ? rating.notHelpful + 1 : rating.notHelpful,
        };
      }
      return rating;
    });
    saveRatings(updatedRatings);
  };

  const averageRating = calculateAverageRating();
  const totalReviews = ratings.length || totalRatings;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Rating Summary */}
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
          <StarRating rating={Math.round(averageRating)} readonly />
          <div className="text-sm text-muted-foreground mt-1">
            {totalReviews} 条评价
          </div>
        </div>
        
        {ratings.length > 0 && (
          <div className="flex-1">
            <RatingBreakdown ratings={ratings} />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Star className="h-4 w-4 mr-2" />
              写评价
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>评价 {toolName}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>评分</Label>
                <div className="mt-2">
                  <StarRating 
                    rating={userRating} 
                    onRatingChange={setUserRating}
                    size="lg"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="review">评价内容 (可选)</Label>
                <Textarea
                  id="review"
                  placeholder="分享您的使用体验..."
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  className="mt-2"
                />
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
                  取消
                </Button>
                <Button 
                  onClick={handleSubmitReview}
                  disabled={userRating === 0 || isSubmitting}
                >
                  {isSubmitting ? '提交中...' : '提交评价'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Reviews List */}
      {ratings.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="font-medium">用户评价</span>
          </div>
          
          <div className="space-y-3">
            {ratings.slice(0, 5).map((rating) => (
              <ReviewItem 
                key={rating.id} 
                rating={rating} 
                onHelpfulClick={handleHelpfulClick}
              />
            ))}
            
            {ratings.length > 5 && (
              <Button variant="outline" size="sm" className="w-full">
                查看更多评价 ({ratings.length - 5})
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}