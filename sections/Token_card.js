const Token = ({
  item,
  onClick,
  onCollect,
  onBid,
  tzktUrl,
  timeLeft,
  onClaim,
}) => {
  return (
    <div className="ui fluid card">
      <div className="image">
        <img
          onClick={onClick}
          style={{ maxHeight: "200px", objectFit: "cover" }}
          src={`https://ipfs.io/ipfs/${item.image.split("ipfs://")[1]}`}
          alt={item.description}
        />
      </div>
      <div className="content">
        <div className="right floated">
          Price:
          <div style={{ color: "black" }}>{item.amount / 1000000.0} TEZ</div>
        </div>
        <div className="header">{item.name}</div>
        <div className="meta">{item.symbol}</div>
        <div className="description">
          {item.description.length > 15
            ? item.description.slice(0, 15) + "..."
            : item.description}
        </div>
        <div className="bid">
          {item.is_auction ? `Top bid is:  ${item.top_bid / 1000000} TEZ` : ""}
        </div>
        <div className="last-bid-time">
          {/* TODO: refactor here */}
          {item.active_auction
            ? `Minutes until next bid:  ${
                new Date(item.last_bid).getMinutes() -
                  new Date().getMinutes() >=
                0
                  ? new Date(item.last_bid).getMinutes() -
                    new Date().getMinutes()
                  : 0
              }`
            : ""}
        </div>
        <div className="auction-timer">
          {item.is_auction && item.active_auction
            ? `Auction ends in: ${Math.floor(timeLeft / 86400000)} days, ${
                Math.floor(Math.abs(timeLeft) / 1000 / 60 / 60) % 24
              } hours, ${
                Math.floor(Math.abs(timeLeft) / 1000 / 60) % 60
              } minutes`
            : ""}
        </div>
        <div className="tzkt">
          <a href={`https://kathmandunet.tzkt.io/${tzktUrl}/operations`}>
            Contract
          </a>
        </div>
      </div>

      <div className="extra content">
        <span className="right floated">
          <button
            className={`ui basic button ${!item.collectable ? "disabled" : ""}`}
            onClick={item.is_auction ? onBid : onCollect}
          >
            {item.collectable && !item.is_auction ? "Buy" : "Bid"}
          </button>
          <button
            className={`ui basic button ${!item.collectable ? "disabled" : ""}`}
            onClick={onClaim}
          >
            Claim item
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

export default Token;
