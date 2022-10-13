const PersonalToken = ({
  item,
  onChangePrice,
  onChangeSaleStatus,
  onStartAuction,
  onStopAuction,
  onFeatured,
}) => {
  return (
    <div className="ui fluid card">
      <div className="image">
        <img
          style={{ maxHeight: "200px", objectFit: "cover" }}
          src={`https://ipfs.io/ipfs/${item.image.split("ipfs://")[1]}`}
          alt={item.description}
        />
      </div>
      <div className="content">
        <div className="right floated">
          Price:
          <div style={{ color: "black" }}>{item.amount / 1000000} TEZ</div>
        </div>
        <div className="header">{item.name}</div>
        <div className="meta">{item.symbol}</div>
        <div className="description">
          {item.description.length > 15
            ? item.description.slice(0, 15) + "..."
            : item.description}
        </div>
      </div>

      <div className="extra content">
        <span className="right floated">
          <button
            className={`ui basic button ${item.is_auction ? "disabled" : ""}`}
            onClick={onChangePrice}
          >
            Change price
          </button>
        </span>
        <span className="right floated">
          <button
            className={`ui basic button ${item.is_auction ? "disabled" : ""}`}
            onClick={onChangeSaleStatus}
          >
            Change sale status
          </button>
        </span>
        <span className="right floated">
          <button
            className={`ui basic button ${
              item.is_auction && item.active_auction ? "disabled" : ""
            }`}
            onClick={onStartAuction}
          >
            Start auction
          </button>
        </span>
        <span className="right floated">
          <button
            className={`ui basic button ${item.is_auction ? "" : "disabled"}`}
            onClick={onStopAuction}
          >
            Stop auction
          </button>
        </span>
        <span className="right floated">
          <button
            className={`ui basic button ${item.is_featured ? "disabled" : ""}`}
            onClick={onFeatured}
          >
            Make featured
          </button>
        </span>
        <span>
          Token ID:
          <div style={{ color: "black" }}>{item.token_id}</div>
        </span>
      </div>
    </div>
  );
};

export default PersonalToken;
