interface Transaction {
  id: string;
  category: string;
  amount: number;
}

export interface Insight {
  id: string;
  type: string;
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
}

/**
 * generateDynamicInsights
 * Simulated AI logic to generate insights based on transaction data.
 */
export function generateDynamicInsights(transactions: Transaction[]): Insight[] {
  const insights: Insight[] = [];

  // 1. Logic for Tech Exposure
  const techTransactions = transactions.filter(tx => tx.category === 'Electronics' || tx.category === 'Software');
  const techSpending = Math.abs(techTransactions.reduce((acc, tx) => acc + tx.amount, 0));
  
  if (techSpending > 1000) {
    insights.push({
      id: 'ai-1',
      type: 'strategy',
      title: 'Optimize Tech Exposure',
      description: `Your tech spending reached $${techSpending.toFixed(2)} this month. Consider rebalancing your portfolio to mitigate sector-specific risk.`,
      impact: 'High'
    });
  }

  // 2. Logic for Subscriptions
  const subscriptions = transactions.filter(tx => tx.category === 'Subscriptions');
  if (subscriptions.length > 3) {
    const annualSavings = subscriptions.length * 15 * 12; // Mock calculation
    insights.push({
      id: 'ai-2',
      type: 'savings',
      title: 'Subscription Cleanup',
      description: `You have ${subscriptions.length} active subscriptions. Removing duplicates could save you up to $${annualSavings} annually.`,
      impact: 'Medium'
    });
  }

  // 3. Logic for Savings Rate
  const income = transactions.filter(tx => tx.amount > 0).reduce((acc, tx) => acc + tx.amount, 0);
  const expenses = Math.abs(transactions.filter(tx => tx.amount < 0).reduce((acc, tx) => acc + tx.amount, 0));
  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  if (savingsRate > 20) {
    insights.push({
      id: 'ai-3',
      type: 'achievement',
      title: 'High Savings Rate',
      description: `Excellent! Your savings rate is ${savingsRate.toFixed(1)}% this month. You're on track to hit your yearly goal 2 months early.`,
      impact: 'High'
    });
  } else {
    insights.push({
      id: 'ai-4',
      type: 'tip',
      title: 'Budget Alert',
      description: `Your spending is higher than usual this week. Cutting back on 'Dining Out' could improve your monthly savings by 8%.`,
      impact: 'Medium'
    });
  }

  return insights;
}
