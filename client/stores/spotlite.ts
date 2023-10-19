import { defineStore } from "pinia";

import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

export const useSpotliteStore = defineStore(
  "spotlite",
  () => {
    const cycleDay = ref(null);

    const createSpotliters = async (pool: Array<string>) => {
      await fetchy("api/spotlites", "POST", {
        body: { pool },
      });
    };

    const getSpotliters = async () => {
      let spotliters;
      try {
        spotliters = await fetchy(`api/spotlites`, "GET");
      } catch (_) {
        return;
      }
      return spotliters;
    };

    const getUserById = async (id: string) => {
      let user;
      try {
        user = await fetchy(`api/users/${id}`, "GET");
      } catch (_) {
        return;
      }
      return user;
    };

    const isSpotliter = async (id: string) => {
      let isSpotliter;
      try {
        isSpotliter = await fetchy(`api/spotlites/${id}`, "GET");
      } catch (_) {
        return false;
      }
      return isSpotliter;
    };

    const incrementCycleDays = async (pool: Array<string>) => {
      cycleDay.value = await fetchy("api/spotlites/cycle", "PATCH", {
        body: { pool },
      });
    };

    return {
      createSpotliters,
      getSpotliters,
      getUserById,
      isSpotliter,
      incrementCycleDays,
      cycleDay,
    };
  },
  { persist: true },
);
