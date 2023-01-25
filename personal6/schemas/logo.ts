import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'logo',
  title: 'Logo',
  type: 'document',
  fields: [
    defineField({
      name: 'logoImg',
      title: 'LogoImg',
      type: 'image',
    }),
  ],

  preview: {
    select: {
      author: 'logo.name',
      media: 'logoImg',
    },
    prepare(selection) {
      const { logo } = selection
      return {...selection, subtitle: logo && `by ${logo}`}
    },
  },
})
