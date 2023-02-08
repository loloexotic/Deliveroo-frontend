import Meal from "./Meal";

const Category = ({ elem }) => {
  return (
    <section>
      <h2>{elem.name}</h2>
      {elem.meals.map((meal, index) => {
        return <Meal meal={meal} key={meal.id} />;
      })}
    </section>
  );
};

export default Category;
