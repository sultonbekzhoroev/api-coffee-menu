import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsBasket2 } from "react-icons/bs";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as React from "react";

const url = "https://mocki.io/v1/9a0e6aef-fb09-4d2d-a7b5-da7347366395";
function App() {
  const [coffeeList, setCoffeeList] = useState([]);
  const [search, setSearch] = useState("");
  const [qauntity, setQauntity] = useState(1);
  const fetchTheApi = async () => {
    try {
      const req = await axios.get(url);
      console.log(req.data);
      setCoffeeList(req.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTheApi();
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const filteredCoffee = coffeeList.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="icons">
        <TextField
          id="standard-basic"
          label="Search your favorite..."
          variant="standard"
          value={search}
          onChange={(e) => handleChange(e)}
        />
        <BsBasket2 style={{ fontSize: "50px" }} />
      </div>
      <div className="product-list">
        {filteredCoffee.map((item) => {
          return (
            <div className="coffee-list">
              <Card
                sx={{ maxWidth: 345, backgroundColor: "black", color: "white" }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ color: "white" }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => setQauntity((prev) => prev + 1)}
                  >
                    Add one
                  </Button>
                  <span>{qauntity}</span>
                  <Button
                    size="small"
                    onClick={() => setQauntity((prev) => prev - 1)}
                  >
                    less one
                  </Button>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
