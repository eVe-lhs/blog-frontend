import moment from "moment";

const DraftTemp = [
  {
    id: 1,
    heading:
      "",
    text: "",
    imageUrl:
      "",
    date: "Mar 20,2023",
    tags: [],
    author: "Author1",
  },
  {
    id: 2,
    heading:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live.",
    imageUrl:
      "",
    text: "",
    date: "Mar 20,2023",
    tags: [],
    author: "Author2",
  },
  {
    id: 3,
    heading:
      "",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ad/Football_in_Bloomington%2C_Indiana%2C_1996.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet massa vitae tortor condimentum.",
    date: "Mar 20,2023",
    tags: ["Technology", "Webdevelopment"],
    author: "Author3",
  },
  {
    id: 4,
    heading:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live.",
    imageUrl:
      "https://img.freepik.com/free-vector/isometric-people-working-with-technology_52683-19078.jpg",
    text: "",
    date: "Mar 20,2023",
    tags: ["Technology", "Webdevelopment"],
    author: "Author4",
    
  },
];

export const DraftPosts = () => {
  return (
    <div class="flow-root w-4/5 md:w-3/4 mx-auto">
      <ul class="divide-y divide-gray-300 dark:divide-gray-700">
        {DraftTemp.map((post) => (
          <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-red-500 truncate dark:text-red-400">
                  (Draft)
                </p>
                <p class="text-sm font-semibold text-gray-500 italic truncate dark:text-red-400">
                  {moment(post.date).fromNow()}
                </p>
                <p class="text-sm text-gray-900 truncate dark:text-gray-50">
                  {post.heading ? post.heading : <>(No headings)</>}
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                  {post.text ? post.text : <>(No text)</>}
                        </p>
                        <div className="w-40">{post.imageUrl? <img src={post.imageUrl} className="w-full" /> : <span className="font-bold">(No images selected)</span>}</div>
                
              </div>
              <div class="inline-flex items-center text-sm font-semibold">
                <button className="py-2 px-4 bg-primary rounded-md text-gray-50">
                  Edit
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
