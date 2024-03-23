import { connect } from "react-redux";
import "./style.css";
import { setFilters } from "../../redux/filter/filterAction";

const Filter = ({ filters, filterItem, shops }) => {
  return (
    <>
      <ul className="filter-list">
        <h5>CATEGORIES</h5>
        {[
          "Electronics",
          "Clothing",
          "Books",
          "Home Goods",
          "Groceries",
          "Vegetables",
          "Fruits",
        ]?.map((category, index) => (
          <li
            key={index}
            className={
              filters?.category === category
                ? "filter-link active"
                : "filter-link"
            }
            onClick={() => filterItem({ category })}
          >
            {category}
          </li>
        ))}
      </ul>
      <ul className="filter-list">
        <h5>SHOPS</h5>
        <li
          key="Nearby Shops"
          className={
            filters?.Nearby === true
              ? "filter-link active"
              : "filter-link"
          }
          onClick={() => filterItem({ Nearby: true })}
        >
          Nearby Shops
        </li>

        {shops?.map((shop, index) => (
          <li
            key={index}
            className={
              filters?.shopId === shop?._id
                ? "filter-link active"
                : "filter-link"
            }
            onClick={() => filterItem({ shopId: shop?._id })}
          >
            {shop?.name}
          </li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    filters: state.filter.filters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterItem: (filter) => dispatch(setFilters(filter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
