// 定义卡片类型的字面量联合类型，提供更严格的类型检查
export type CardType = "anime" | "article";

// 基础卡片接口，包含所有卡片类型的共同字段
interface BaseCard {
  id: number;
  cardType: CardType;
  title: string;
  
}

// 动漫卡片接口，继承基础卡片并添加特有字段
interface AnimeCard extends BaseCard {
  cardType: "anime";
  img: string;
  content: string;
}

// 文章卡片接口，继承基础卡片并添加特有字段
interface ArticleCard extends BaseCard {
  cardType: "article";
  des: string;
  content: string;
  img?: string;
}

// 联合类型，表示可以是动漫卡片或文章卡片
export type AnimeArticle = AnimeCard | ArticleCard;

// 类型守卫函数，用于在运行时判断卡片类型
export function isAnimeCard(card: AnimeArticle): card is AnimeCard {
  return card.cardType === "anime";
}

export function isArticleCard(card: AnimeArticle): card is ArticleCard {
  return card.cardType === "article";
}
