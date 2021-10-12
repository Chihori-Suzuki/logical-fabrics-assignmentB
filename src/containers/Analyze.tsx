import { TextField, Button, Typography, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRef, useState } from "react";
import ResultTable from "../components/ResultTable";
import FindInPageIcon from "@mui/icons-material/FindInPage";

const useStyle = makeStyles(() => {
  return {
    root: {
      marginTop: "10px",
    },
    title: {
      fontSize: "24px",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      justifyContent: "flex-start",
      marginTop: "20px",
      marginBottom: "20px",
    },
    tableContainer: {
      maxWidth: "320px",
    },
  };
});

const Analyze = () => {
  const classes = useStyle();

  const [fetchedData, setData] = useState([]);
  const [loadState, setLoadState] = useState(false);
  const textRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadState(true);
    fetch(
      `https://lf-exam-v2.web.app/api/analyze?imageUrl=${
        textRef.current!.value
      }`
    )
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        setData(data);
        setLoadState(false);
      })
      .catch((e) => {
        setData([]);
        setLoadState(false);
      });
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h5" className={classes.title} gutterBottom>
        Example App / Exam v2
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          required
          id="image-url"
          label="image URL"
          inputRef={textRef}
          size="small"
          style={{ marginRight: "10px" }}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={<FindInPageIcon />}
          disabled={loadState}
          style={loadState ? {} : { backgroundColor: "#3F50B5" }}
        >
          {loadState ? "Analyzing..." : "Analyze"}
        </Button>
      </form>

      {fetchedData.length > 0 && <ResultTable fetchedData={fetchedData} />}
    </Container>
  );
};

export default Analyze;
