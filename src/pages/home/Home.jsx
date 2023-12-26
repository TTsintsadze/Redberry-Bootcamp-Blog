import React, { useEffect, useState } from 'react'
import HomeImg from '../../assets/Blog-1024x355 1.png'
import CategoryButton from '../../components/CategoryButton';
import BlogCart from '../../components/BlogCart';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useGlobalContext } from '../../context/Context';
import GuestLayout from '../../layouts/GuestLayout';
import HorizontalScroll from '../../components/HorizontalScroll';

const Home = () => {
  const { categories, blogs} =
    useGlobalContext();
    const [selectedCategories, setSelectedCategories] = useSessionStorage("categories",[]);

    const toggleCategorySelection = (categoryId) => {
      const index = selectedCategories.indexOf(categoryId);
      if (index === -1) {
        setSelectedCategories([...selectedCategories, categoryId]);
      } else {
        const updatedCategories = [...selectedCategories];
        updatedCategories.splice(index, 1); 
        setSelectedCategories(updatedCategories);
      }
    };

  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter((blog) =>
        selectedCategories.some((selectedCat) =>
          blog.categories.some((blogCat) => blogCat.id === selectedCat)
        )
      );
      setFilteredBlogs(filtered);
    }
  }, [selectedCategories, blogs]);

  const isPublished = (publishDate) => {
    const timestamp1 = new Date().getTime();
    const timestamp2 = new Date(publishDate).getTime();

    if(timestamp2 > timestamp1){
      return true
    }else{
      return false
    }
  }
  return (
   
    <GuestLayout>
    <div className="flex-col flex px-[10px] py-8 justify-between lg:flex-row items-center md:px-14 2xl:px-24">
        <h1 className="text-[60px] font-bold 2xl:text-[74px]">
          ბლოგი
        </h1>
        <img src={HomeImg} className="h-[350px]" />
    </div>
    <div className="px-24 py-8  flex justify-center px-[30px] md:px-14 2xl:px-24">
    <HorizontalScroll className="w-[684px] flex gap-[22px] horizontal-scroll overflow-hidden">
         
         {categories.map((option) => (
           <div
             key={option.id}
             className={`scroll-item ${
               selectedCategories.includes(option.id)
                 ? "border-[2px] border-black"
                 : ""
             } flex-none`}
             style={{ borderRadius: "30px" }}
             onClick={() => {
               toggleCategorySelection(option.id);
             }}
           >
             <CategoryButton
               text={option.title}
               bgColor={option.background_color}
               textColor={option.text_color}
             />
           </div>
         ))}
       
     </HorizontalScroll>
   </div>
   <div className="px-24 py-8 flex justify-between flex-wrap gap-y-12">
        {filteredBlogs
          .filter((blog) => !isPublished(blog.publish_date))
          .map((blog) => (
            <BlogCart
              key={blog.id}
              name={blog.author}
              date={blog.publish_date}
              img={blog.image}
              announcement={blog.title}
              description={blog.description}
              categories={blog.categories}
              id={blog.id}
            />
          ))}
      </div>
    </GuestLayout>
  );
}

export default Home