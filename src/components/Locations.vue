<template>
  <v-card class="treeview-card">
    <v-toolbar flat color="primary">
      <v-toolbar-title id="locations-toolbar">Locations</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-row>
        <v-text-field
          v-model="searchLocations"
          label="Search Locations"
          clearable
          flat
          clear-icon="mdi-close-circle-outline"
        />
      </v-row>

      <v-row>
        <v-treeview
          :items="locationTreeItems"
          :search="searchLocations"
          selectable
          :multiple-active="false"
          selection-type="independent"
          v-model="locationSelected"
          width="550"
        />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import * as locations from "./../../location.json";

interface TreeData {
  id: string;
  name: string; // classificationid: desc
  children: TreeData[];
}

export default Vue.extend({
  data: () => ({
    locationTreeItems: [] as TreeData[],
    locationParentIds: new Set<string>(),
    locationTreeData: new Map<string, TreeData>(),
    search: null,
    locationSelected: [] as string[],
    searchLocations: ""
  }),
  watch: {
    classificationSelected: {
      deep: true,
      handler() {
        if (this.locationSelected.length > 1) {
          this.locationSelected[0] = this.locationSelected[1];
        }
      }
    }
  },
  beforeMount() {
      this.parseLocations();
  },
  methods: {
    parseLocations() {
        locations.member.forEach(item => {
            if (item.parent === "" || item.parent === null) {
                this.locationParentIds.add(item.location);
            }

            this.locationTreeData.set(item.location,
                {
                    id: item.location,
                    name: `${item.location}: ${item.description}`,
                    children: []
                } as TreeData);
        });

        locations.member.forEach(item => {
            // eslint-disable-next-line
            const child = this.locationTreeData.get(item.location)!;
            const parent = this.locationTreeData.get(item.parent);

            if (parent) {
                parent.children.push(child);
            }
        });

        this.locationTreeItems = this.valuesAsArr(this.locationTreeData, this.locationParentIds);
    },
    valuesAsArr(treeData: Map<string, TreeData>, parentIds: Set<string>) {
      function compare(a: TreeData, b: TreeData) {
        if (a.children.length < b.children.length) {
          return 1;
        }

        if (a.children.length > b.children.length) {
          return -1;
        }

        return 0;
      }

      const valuesArr = [...treeData.values()]
        .filter(x => parentIds.has(x.id))
        .sort(compare);

      return valuesArr;
    }
  }
});
</script>

<style scoped>
#locations-toolbar {
    color: white;
}
</style>