export const getQuestions = async (categ,diffuc)=> {
    let data = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${categ}&difficulty=${diffuc}`
      );
      let { results } = await data.json();
      return results;
}