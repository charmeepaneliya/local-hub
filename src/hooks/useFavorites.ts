import { useState, useEffect } from "react";

interface FavoriteShop {
  id: number;
  name: string;
  timestamp: number;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteShop[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("shop_favorites");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load favorites:", e);
      }
    }
    setLoaded(true);
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("shop_favorites", JSON.stringify(favorites));
    }
  }, [favorites, loaded]);

  const isFavorite = (shopId: number): boolean => {
    return favorites.some((fav) => fav.id === shopId);
  };

  const addFavorite = (shop: { id: number; name: string }): void => {
    if (!isFavorite(shop.id)) {
      setFavorites((prev) => [
        ...prev,
        {
          id: shop.id,
          name: shop.name,
          timestamp: Date.now(),
        },
      ]);
    }
  };

  const removeFavorite = (shopId: number): void => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== shopId));
  };

  const toggleFavorite = (shop: { id: number; name: string }): void => {
    if (isFavorite(shop.id)) {
      removeFavorite(shop.id);
    } else {
      addFavorite(shop);
    }
  };

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    loaded,
  };
};
