import { motion } from "framer-motion";

export default function Notifications() {
  return (
    <div className="md:mt-5 mt-14 relative z-0 font-body ">
      <motion.div
        className="md:w-5/12 w-full mx-auto mt-10 bg-red-500"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            type: "tween",
            stiffness: 200,
            damping: 20,
            delay: 0.2,
          },
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Nibh venenatis cras
        sed felis eget velit aliquet sagittis. Gravida dictum fusce ut placerat
        orci nulla pellentesque dignissim enim. Sollicitudin tempor id eu nisl
        nunc mi. Dignissim enim sit amet venenatis urna cursus eget. Velit
        dignissim sodales ut eu sem integer vitae. Viverra vitae congue eu
        consequat ac felis. Eget dolor morbi non arcu. Mattis aliquam faucibus
        purus in. Blandit volutpat maecenas volutpat blandit aliquam. Dui id
        ornare arcu odio ut sem. Donec adipiscing tristique risus nec feugiat in
        fermentum posuere urna. Ac tincidunt vitae semper quis lectus. Amet
        porttitor eget dolor morbi non arcu. Vulputate mi sit amet mauris
        commodo. Mauris pellentesque pulvinar pellentesque habitant morbi
        tristique senectus et. Magna fermentum iaculis eu non diam phasellus
        vestibulum. Vel eros donec ac odio tempor orci. Vel fringilla est
        ullamcorper eget nulla facilisi etiam dignissim diam. Et malesuada fames
        ac turpis. Augue eget arcu dictum varius duis at consectetur. Placerat
        duis ultricies lacus sed turpis tincidunt id aliquet. Adipiscing diam
        donec adipiscing tristique risus nec feugiat. Condimentum lacinia quis
        vel eros donec. Massa enim nec dui nunc mattis enim. Duis at tellus at
        urna condimentum. Varius quam quisque id diam. A iaculis at erat
        pellentesque adipiscing commodo elit at. Maecenas accumsan lacus vel
        facilisis volutpat est velit egestas. Facilisi cras fermentum odio eu
        feugiat pretium nibh ipsum. Sem nulla pharetra diam sit amet nisl
        suscipit adipiscing. Elit ullamcorper dignissim cras tincidunt lobortis
        feugiat. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque
        mauris. Nulla facilisi etiam dignissim diam quis enim lobortis
        scelerisque fermentum. Diam in arcu cursus euismod quis viverra.
        Convallis a cras semper auctor neque vitae tempus. Pellentesque diam
        volutpat commodo sed egestas. Et tortor at risus viverra adipiscing at
        in tellus. Sed risus pretium quam vulputate dignissim suspendisse in est
        ante. Volutpat diam ut venenatis tellus in metus vulputate eu.
        Pellentesque dignissim enim sit amet venenatis urna cursus. Pulvinar
        sapien et ligula ullamcorper.
      </motion.div>
    </div>
  );
}
