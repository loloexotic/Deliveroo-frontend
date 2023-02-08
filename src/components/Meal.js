const Meal = ({ meal }) => {
  return (
    <article onClick={addToCart}>
      <p>{meal.title}</p>
      <p>{meal.description}</p>
      <div>
        <p>{meal.price} €</p>
        {meal.popular && <p>Populaire</p>}
      </div>
      {meal.picture && <img src={meal.picture} alt="" />}
    </article>
  );
};

export default Meal;
