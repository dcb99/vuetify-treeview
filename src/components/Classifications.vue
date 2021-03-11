<template>
  <v-card>
    <v-toolbar flat color="primary">
      <v-toolbar-title id="classifications-toolbar" text-color="white">Classifications</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-row>
        <v-text-field
          v-model="searchClassifications"
          label="Search Classifications"
          clearable
          flat
          clear-icon="mdi-close-circle-outline"
        />
      </v-row>

      <v-row>
        <v-treeview
          :items="classificationTreeItems"
          :search="searchClassifications"
          selectable
          :multiple-active="false"
          selection-type="independent"
          v-model="classificationSelected"
          width="550"
        />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import * as classStructure from "./../../classstructure.json";

interface TreeData {
  id: string;
  name: string; // classificationid: desc
  children: TreeData[];
}

export default Vue.extend({
  data: () => ({
    classificationTreeItems: [] as TreeData[],
    classificationParentIds: new Set<string>(),
    classificationTreeData: new Map<string, TreeData>(),
    search: null,
    classificationSelected: [] as string[],
    searchClassifications: ""
  }),
  watch: {
    classificationSelected: {
      deep: true,
      handler() {
        if (this.classificationSelected.length > 1) {
          this.classificationSelected[0] = this.classificationSelected[1];
        }
      }
    }
  },
  beforeMount() {
    this.parseClassifications();
  },
  methods: {
    parseClassifications() {
      classStructure.member.forEach(item => {
        if (item.parent === "" || item.parent === null) {
          this.classificationParentIds.add(item.classstructureid);
        }

        this.classificationTreeData.set(item.classstructureid,
          {
            id: item.classstructureid,
            name: `${item.classificationid}: ${item.description}`,
            children: []
          } as TreeData);
      });

      classStructure.member.forEach(item => {
        // get 2 tree data one for classstructureid 1 for parent
        // eslint-disable-next-line
        const child = this.classificationTreeData.get(item.classstructureid)!;
        // eslint-disable-next-line
        const parent = this.classificationTreeData.get(item.parent)!;

        if (parent) {
          parent.children.push(child);
        }
      });

      // dict id => tree data dict<classstructureid: treeData>
      // create classstuctureid entry in dictionary assuming it doesnt exist
      // get parent, if !exist, create then get;
      // parent.children.push classstructureid obj
      // build array of classstructureid that has no parent

      this.classificationTreeItems = this.valuesAsArr(this.classificationTreeData, this.classificationParentIds);
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
#classifications-toolbar {
    color: white;
}
</style>