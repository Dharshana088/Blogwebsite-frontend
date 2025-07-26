import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BlogCard from "../components/BlogCard";
import CategoryTabs from "../components/CategoryTabs";
import { getBlogs } from "../services/blog";

const BlogFeed = () => {
  const [blogs, setBlogs] = useState([]);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (fetchBlogs) fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      if (getBlogs) {
        const res = await getBlogs();
        if (setBlogs) setBlogs(res?.data?.blogs || []);
      }
    } catch (err) {
      if (console?.error) console.error("Failed to load blogs", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs
    ?.filter((blog) => {
      if (tab === "all") return true;
      return blog?.tags?.some((tag) =>
        tag?.toLowerCase()?.includes(tab?.toLowerCase())
      );
    })
    ?.filter((blog) =>
      blog?.title?.toLowerCase()?.includes(search?.toLowerCase())
    );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Container maxWidth="xl" sx={{ py: 3, px: 3 }}>
        <Box mb={4}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search blogs by title..."
            value={search}
            onChange={(e) => {
              if (setSearch) setSearch(e?.target?.value);
            }}
            sx={{
              maxWidth: "600px",
              mx: "auto",
              display: "block",
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "white",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ px: 2, pt: 2, pb: 5 }}>
          <CategoryTabs
            value={tab}
            onChange={(e, newVal) => {
              if (setTab) setTab(newVal);
            }}
          />
        </Box>

        <Box>
          {loading ? (
            <Box textAlign="center" mt={8}>
              <CircularProgress />
            </Box>
          ) : filteredBlogs?.length === 0 ? (
            <Typography
              textAlign="center"
              mt={4}
              variant="h6"
              color="text.secondary"
            >
              No blogs found.
            </Typography>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {filteredBlogs?.map((blog) => (
                <BlogCard key={blog?._id} blog={blog} />
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default BlogFeed;
