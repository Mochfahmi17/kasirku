export const generateDummyRevenueData = () => {
  const data = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const formattedDate = date.toISOString().split("T")[0];

    data.push({
      date: formattedDate,
      income: Math.floor(Math.random() * 5_000_000),
    });
  }

  return data;
};
