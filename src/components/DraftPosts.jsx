import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { ModelDataContext, UserContext } from "../App";
import { BounceLoader } from "react-spinners";

const DraftTemp = [
  {
    id: 1,
    heading: "",
    text: "",
    imageUrl: "",
    date: "Mar 20,2023",
    tags: [],
    author: "Author1",
  },
  {
    id: 2,
    heading:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live.",
    imageUrl: "",
    text: "",
    date: "Mar 20,2023",
    tags: [],
    author: "Author2",
  },
  {
    id: 3,
    heading: "",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ad/Football_in_Bloomington%2C_Indiana%2C_1996.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet massa vitae tortor condimentum.",
    date: "Mar 20,2023",
    tags: ["Celebrity", "Politics"],
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
    tags: ["Computer Science", "Animals"],
    author: "Author4",
    description: `# Inani illa hospes velox ventorum mentisque lumine

## Mihi deos generis blanditiis fuit locus

Lorem markdownum terga. Aequore plenaque iniqui ut canoro gurgite mors nec
arcebatque, Dolona. Vigilans felicissima sinistra oneratos. Tuos haesit postera
quodque sitim resurgebant tibi vocem?

Ea mediamque sacro, non unum, ipsa, viscera nec omnis, excussit. Nati iuncta,
cum nova uterque fixit iuncisque priori! Vidit in sed quam conponere quorum,
calamo primo ursaque seque custodemque Diam, [quod](http://favilla.com/)
tenetur. Aquarum sagittas modo Stymphalides annos, misisset ipse, illis
relinquet terras, terraeque, moriens incenduntque laeto.

> Esse rudem aestusque verborum inmodico in quoque vacuus; cur. Fumat *tot
> pascua pectora* et pomaque, in dentibus orbis herbis et omnes et inter.
> Appellare Antiphates quidem caespite.

## Aer matre eras intrata dextra ut mediis

Deum est ponto si ductum, se, nec Palati figuras; moenia ait mercede. Flammas
scitanti, spectare effodit tamen aries. Namque appellare mundus.

> Queat ferunt moenia. Sed natus [torvo](http://hymenaee-mittunt.net/), humus
> sociorum placabat in fixit.

A dictis vulneribus, ille dolori astris succedat. Dimisit agri, lacrimaeque quae
iuverat postera cum cum obstrepuere viret: [crescit](http://undas.com/): nox
*quid*.

    if (hardBingOsd(association_menu_bot.ftp_pci_tag.typeface(221745,
            sdsl_path_bank), flatHorse)) {
        printLeft = rjLogic;
    } else {
        system_syntax(alertJumper.commerceKeywordsNetiquette(
                perlCertificateSnow), 2, prebinding);
        basicSync.controller = fddi_fi;
    }
    wavelength = intellectual_eide;
    if (protector - cyberspaceGifSd + font_emulation_mac(10)) {
        export_iteration_compatible(graymail, suffix + trashUser, 3);
    }
    if (socialByteDirectory(modem + 4) / halftone(windowGifMatrix)) {
        gisType -= remote_ata_nanometer;
        mtuAvatarDongle += led_website.compatible_services(814402, 4, 2) +
                aiff_word_xp;
    }

Frustra evolvit! Est gurges gracili **hoc** est mora agitasse in acrior Phoebus
dabat, et et ferro. Ulla colla crimen vellet; tepido dignior haec nec auctorem!
**Es amplexu procorum** mente. Tantum isse poenam, fetus ignota facientibus
crimine meorum.`,
  },
];

export const DraftPosts = ({ setShowModal }) => {
  const { currentUser } = useContext(UserContext)
  const {setModalData} = useContext(ModelDataContext)
  const [drafts,setDrafts] = useState()
  useEffect(() => {
    const fetchPostsOfCurrentUser = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/${currentUser?.id}/posts/draft`
      );
      setDrafts(data);
    };
    fetchPostsOfCurrentUser().catch((err) => console.log(err));
  }, []);
  const override = {
    display: "block",
    position: "fixed",
    top: "80%",
    left: "50%",
    margin: "auto auto",
    transform: "translate(-50%,-50%)",
  };
  if (!currentUser) {
    return (
      <BounceLoader
        color={"#59B2A2"}
        loading={true}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }
  return (
    <div class="flow-root w-4/5 md:w-3/4 mx-auto">
      <ul class="divide-y divide-gray-300 dark:divide-gray-700">
        {drafts?.map((post) => (
          <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-red-500 truncate dark:text-red-400">
                  (Draft)
                </p>
                <p class="text-sm font-semibold text-gray-500 italic truncate dark:text-red-400">
                  {moment(post?.date_of_creation).fromNow()}
                </p>
                <p class="text-sm text-gray-900 truncate dark:text-gray-50">
                  {post?.title ? post?.title : <>(No titles)</>}
                </p>
                <div className="w-40">{post?.post_photo? <img src={post?.post_photo} className="w-full" /> : <span className="font-bold">(No images selected)</span>}</div>
                
              </div>
              <div class="inline-flex items-center text-sm font-semibold">
                <button className="py-2 px-4 bg-primary rounded-md text-gray-50" onClick={async () => {
                  await setModalData(post)
                  setShowModal(true)
                }
                }>
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
