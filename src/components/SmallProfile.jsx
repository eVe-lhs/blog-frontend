const suggestions = [
  {
    name: "John",
    email: "john@email.com",
    imageUrl: "",
    following: true,
  },
  {
    name: "ken",
    email: "ken@email.com",
    imageUrl: "",
    following: false,
  },
  {
    name: "anwar",
    email: "anwar@email.com",
    imageUrl: "",
    following: true,
  },
  {
    name: "John",
    email: "john@email.com",
    imageUrl: "",
    following: false,
  },
];

export const SmallProfile= () => {
  return (
    <div class="flow-root w-4/5 md:w-3/4 mx-auto">
      <ul class="divide-y divide-gray-300 dark:divide-gray-700">
        {suggestions.map((suggestion) => (
          <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <img
                  class="w-9 h-9 rounded-lg"
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg"
                  alt=""
                />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900 truncate dark:text-white">
                  {suggestion.name}
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                  {suggestion.email}
                </p>
              </div>
              <div class="inline-flex items-center text-sm font-semibold">
                <button className="py-2 px-3 bg-gray-300 rounded-lg dark:bg-gray-700">
                  {" "}
                  {suggestion.following ? <>Follow </> : <>Unfollow</>}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
