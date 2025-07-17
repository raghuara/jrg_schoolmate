import { Box, Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { selectGrades } from "../../Redux/Slices/DropdownController";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { useLocation, useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const categoryColorMap = {
    Nursery: {
        primary: "#A749CC",
        light: "rgba(167, 73, 204, .1)",
        dark: "rgba(167, 73, 204, .2)",
    },
    Primary: {
        primary: "#F6A059",
        light: "rgba(246, 160, 89, .1)",
        dark: "rgba(246, 160, 89, .2)",
    },
    Secondary: {
        primary: "#CF02AB",
        light: "rgba(159, 1, 132, .1)",
        dark: "rgba(159, 1, 132, .2)",
    },
};

const getCategoryColors = (category) =>
    categoryColorMap[category] || {
        primary: "#6C757D",
        light: "#E9ECEF",
        dark: "#343A40",
    };

export default function MarksPage() {
    const navigate = useNavigate()
    const grades = useSelector(selectGrades);
    const user = useSelector((state) => state.auth);
    const rollNumber = user.rollNumber
    const userType = user.userType
    const userName = user.name

    const groupedGrades = grades.reduce((acc, item) => {
        const category = item.category || "Others";
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {});

    const handleCreateNews = () => {
        navigate('addmarks')
    }
    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{
                    backgroundColor: "#f2f2f2",
                    py: 1.5,
                    px: 3,
                    borderRadius: "10px 10px 10px 0px",
                    borderBottom: "1px solid #ddd",
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "20px",
                    }}
                >
                    Marks / Results
                </Typography>
                {userType !== "teacher" &&
                    <Button
                        onClick={handleCreateNews}
                        variant="outlined"
                        sx={{
                            borderColor: "#A9A9A9",
                            backgroundColor: "#000",
                            py: 0.3,
                            width: "110px",
                            height: "30px",
                            color: "#fff",
                            textTransform: "none",
                            border: "none",

                        }}
                    >
                        <AddIcon sx={{ fontSize: "20px" }} />
                        &nbsp;Marks
                    </Button>
                }
            </Box>
            <Box sx={{ p: 2 }}>
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        px: 2,
                        pt: 2,
                        borderRadius: "15px",
                        height: "74vh",
                        overflowY: "auto",
                    }}
                >
                    {Object.entries(groupedGrades).map(([category, items]) => {
                        const { primary } = getCategoryColors(category);

                        return (
                            <Box key={category} sx={{ mb: 1 }}>
                                {/* Category Heading */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: 2
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: "10px",
                                            height: "10px",
                                            backgroundColor: primary,
                                            borderRadius: "50%",
                                            mr: 1
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontWeight: "700",
                                            fontSize: "16px",
                                            color: "#000",
                                        }}
                                    >
                                        {category} Results
                                    </Typography>
                                </Box>

                                {/* Items in Category */}
                                <Grid container spacing={3}>
                                    {items.map((item, index) => {
                                        const { light, dark } = getCategoryColors(item.category);

                                        return (
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                key={index}
                                                sx={{ display: "flex", justifyContent: "center" }}
                                            >
                                                <Link
                                                    to={`view`}
                                                    state={{ grade: item.sign, gradeId: item.id }}
                                                    style={{ textDecoration: "none", width: "100%" }}
                                                >
                                                    <Box
                                                        sx={{
                                                            backgroundColor: light,
                                                            width: "100%",
                                                            height: "80px",
                                                            py: 2,
                                                            mb: 2,
                                                            position: "relative",
                                                            borderRadius: "7px",
                                                            cursor: "pointer",
                                                            "&:hover": {
                                                                ".arrowIcon": {
                                                                    opacity: 1,
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: "7px",
                                                                backgroundColor: primary,
                                                                height: "100%",
                                                                position: "absolute",
                                                                left: 0,
                                                                top: 0,
                                                                borderTopLeftRadius: "5px",
                                                                borderBottomLeftRadius: "5px",
                                                            }}
                                                        />
                                                        <Grid
                                                            container
                                                            spacing={1}
                                                            sx={{ height: "100%", px: 2 }}
                                                        >
                                                            <Grid
                                                                item
                                                                xs={3}
                                                                sx={{
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        backgroundColor: dark,
                                                                        borderRadius: "50%",
                                                                        width: "40px",
                                                                        height: "40px",
                                                                        display: "flex",
                                                                        justifyContent: "center",
                                                                        alignItems: "center",
                                                                    }}
                                                                >
                                                                    <NewspaperIcon sx={{ color: primary }} width={25} height={25} />
                                                                </Box>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={5}
                                                                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: "600",
                                                                        color: "#000",
                                                                    }}
                                                                >
                                                                    {item.sign}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={3}
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "end"
                                                                }}
                                                            >
                                                                <ArrowForwardIcon
                                                                    className="arrowIcon"
                                                                    sx={{
                                                                        opacity: 0,
                                                                        fontSize: "28px",
                                                                        fontWeight: "700",
                                                                        transition: "opacity 0.3s ease",
                                                                        color: primary,
                                                                    }}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Link>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
}
