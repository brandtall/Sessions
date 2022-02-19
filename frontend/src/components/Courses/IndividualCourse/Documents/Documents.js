const Documents = (props) => {
    return (
      <div>
        <h1>Course Documents My Dudes</h1>
        <button onClick={() => props.setTab(0)}>Back</button>
      </div>
    );
  }
export default Documents;