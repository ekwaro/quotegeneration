import { useState, useEffect } from "react";
import { Flex, Button, Paper, Blockquote, Loader } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

const GeneratePage = () => {
  /**
   * This array useState hook is used hold the data that has been qurried from the internet
   */
  const [quotes, setQuotes] = useState([
    { id: "1", author: "Dominic", quote: "I am the one to move forward" },
  ]);

  /**This state holds value for the application that has been filtered from the list of quotes in the quotes array */
  const [exactQuote, setExactQuote] = useState([
    {
      id: "1",
      author: "Dominic",
      quote: "I am the one to move forward",
      liked: false,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [arrayIndex, setArrayIndex] = useState(0);
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);
//This method is used to toggle between the user liking a quote and unliking a quote
  const toggleFavorite = (quote) => {
    const exists = favoriteQuotes.find((item) => item.id === quote.id);

    if (exists) {
      // Remove from favorites
      setFavoriteQuotes((prev) => prev.filter((item) => item.id !== quote.id));
    } else {
      // Add to favorites
      const newFav = {
        id: quote.id,
        author: quote.author,
        quote: quote.quote,
      };
      setFavoriteQuotes((prev) => [...prev, newFav]);
    }
  };
//Method used to fetch previous quote, 
  const fetchPrevQuotes = () => {
    setLoading(true);
    try {
      quotes.length >= 2 ? setArrayIndex(quotes.length - 2) : setArrayIndex(0);
      quotes[arrayIndex];
    } catch (err) {
      console.log("error while fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * This is the asynchronous method that will be used to fetch quotes from the internet
   */
  const fetchNextQuotes = async () => {
    setLoading(true);

    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      const data = await res.json();

      setQuotes((prevQuotes) => {
        const newQuotes = [...prevQuotes, data];
        //The line below ensures that quotes state update before we get the new length inorder to obtain t recently fetched quotes
        setArrayIndex(newQuotes.length - 1);
        return newQuotes;
      });
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    setLoading(true);
    if (quotes[arrayIndex]) {
      setExactQuote(quotes[arrayIndex]);
    }

    setLoading(false);
  }, [arrayIndex, quotes]);

  console.log(quotes);
  return (
    <Flex direction="row" mt="lg" justify="center" align="center" gap="lg">
      <Button onClick={() => fetchPrevQuotes()}>Prev</Button>
      <Paper mx="md" bg="cyan">
        {exactQuote && (
          <>
            <Blockquote
              cite={exactQuote.length < 0 ? "" : `Author: ${exactQuote.author}`}
              key={exactQuote.id}
            >
              {loading ? <Loader /> : `${exactQuote.quote}`}
            </Blockquote>
            <Button
              mx="lg"
              variant="outline"
              c="white"
              /**favoriteQuotes.some((q) => q.id === exactQuote.id) */
              rightSection={
                favoriteQuotes.some((item) => item.id === exactQuote.id) ? (
                  <IconHeartFilled />
                ) : (
                  <IconHeart />
                )
              }
              onClick={() => toggleFavorite(exactQuote)}
            >
              {favoriteQuotes.some((item) => item.id === exactQuote.id)
                ? "Liked"
                : "Like"}
            </Button>
          </>
        )}
      </Paper>

      <Button onClick={() => fetchNextQuotes()}>Next</Button>
    </Flex>
  );
};

const FavoriteQuote = () => {
  //Will be implemented
  return <Grid>{fa}</Grid>;
};

export { FavoriteQuote, GeneratePage };
