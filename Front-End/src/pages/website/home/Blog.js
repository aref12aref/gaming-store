export default function Blog(blog) {
    blog = blog.data;

    return (
        <div>
            <div className="product-details-top">
                <h1 className="product-title">{blog.title}</h1>
                <button
                    onClick={() => window.location.reload()}
                    className="back-button"
                >
                    Go Back
                </button>
            </div>
            <div style={{ marginTop: "30px" }}>
                <img
                    src={
                        blog.avatar === "uploads/blog.png"
                            ? `http://localhost:4000/api/${blog.avatar}`
                            : `http://localhost:4000/api/uploads/blogs/${blog.avatar}`
                    }
                    alt={blog.title}
                    width={"300px"}
                    style={{ margin: "40px 0" }}
                />
            </div>
            {blog.content}
        </div>
    );
}
