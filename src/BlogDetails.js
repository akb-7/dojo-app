import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";

const BlogDetails = () => {
    const {id} = useParams();
    let url = "http://localhost:8000/blogs/"+id;
    const {data:blog,isPending,error} = useFetch(url);
    const navigate = useNavigate();
    const handleDelete = (e)=>{
        fetch(url,{
            method:'DELETE'
        }).then(
            () =>navigate("/")
        )
    }
    return (
        <div className="blog-details">
            {isPending && <div>Loading....</div>}
            {error && <div>{error.message}</div>}
            {blog && (
                <article>
                    <h1>{blog.title}</h1>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body} </div>
                    <button onClick={handleDelete}>Delete Blog</button>
                </article>
            )} 
        </div>
    );
}
 
export default BlogDetails;