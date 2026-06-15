/**
 * @openapi
 * components:
 *   schemas:
 *
 *     # ======================
 *     # AUTH & USERS
 *     # ======================
 *
 *     AuthCredentials:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: password123
 *         name:
 *           type: string
 *           nullable: true
 *           example: John Doe
 *
 *     AdminCreateInput:
 *       allOf:
 *         - $ref: '#/components/schemas/AuthCredentials'
 *       example:
 *         email: admin@example.com
 *         password: password123
 *         name: Admin User
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: cmabc123user1
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         name:
 *           type: string
 *           nullable: true
 *           example: John Doe
 *         role:
 *           type: string
 *           enum: [ADMIN, STAFF, USER]
 *           example: USER
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2026-06-15T10:30:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2026-06-15T10:45:00.000Z
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         ok:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/components/schemas/User'
 *             token:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *     ApiResponseUser:
 *       type: object
 *       properties:
 *         ok:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/User'
 *
 *     ApiResponseUsers:
 *       type: object
 *       properties:
 *         ok:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         ok:
 *           type: boolean
 *           example: false
 *         error:
 *           type: string
 *           example: Invalid request
 *
 *     # ======================
 *     # COURSES
 *     # ======================
 *
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         slug:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         curriculum:
 *           type: array
 *           items:
 *             type: string
 *         duration:
 *           type: integer
 *           format: int32
 *         fees:
 *           type: integer
 *           format: int32
 *         eligibility:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CourseCreateInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - slug
 *         - duration
 *         - fees
 *       properties:
 *         title:
 *           type: string
 *           example: Microgreens Mastery
 *         description:
 *           type: string
 *           example: Learn microgreens production and business
 *         slug:
 *           type: string
 *           example: microgreens-mastery
 *         curriculum:
 *           type: array
 *           items:
 *             type: string
 *             example: Introduction
 *         duration:
 *           type: integer
 *           format: int32
 *           example: 30
 *         fees:
 *           type: integer
 *           format: int32
 *           example: 4999
 *         eligibility:
 *           type: string
 *           example: Beginners
 *
 *     ApiResponseCourses:
 *       type: object
 *       properties:
 *         ok:
 *           type: boolean
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Course'
 *
 *     ApiResponseCourse:
 *       type: object
 *       properties:
 *         ok:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/Course'
 *
 *     # ======================
 *     # INTERNSHIPS
 *     # ======================
 *
 *     Internship:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         location:
 *           type: string
 *         duration:
 *           type: integer
 *           format: int32
 *         stipend:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     InternshipCreateInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - location
 *         - duration
 *       properties:
 *         title:
 *           type: string
 *           example: Backend Developer Intern
 *         description:
 *           type: string
 *           example: Work on APIs and databases
 *         location:
 *           type: string
 *           example: Remote
 *         duration:
 *           type: integer
 *           format: int32
 *           example: 3
 *         stipend:
 *           type: number
 *           example: 12000
 *
 *     InternshipApplicationCreateInput:
 *       type: object
 *       required:
 *         - internshipId
 *         - resumeUrl
 *       properties:
 *         internshipId:
 *           type: string
 *           example: cmj12xw0a00007kheutpmc1qu
 *         resumeUrl:
 *           type: string
 *           example: https://example.com/resume.pdf
 *         message:
 *           type: string
 *           example: I am very interested in this internship
 *
 *     Application:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         internshipId:
 *           type: string
 *         resumeUrl:
 *           type: string
 *         message:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     ApplicationWithUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         resumeUrl:
 *           type: string
 *         message:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *
 *     Enrollment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         courseId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     EnrollmentCreateInput:
 *       type: object
 *       required:
 *         - courseId
 *       properties:
 *         courseId:
 *           type: string
 *           example: cmj12xw0a00007kheutpmc1qu
 *
 *     ApiResponseEnrollment:
 *       type: object
 *       properties:
 *         ok:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/Enrollment'
 *
 *     ApiResponseEnrollments:
 *       type: object
 *       properties:
 *         ok:
 *           type: boolean
 *         data:
 *           type: array
 *           items:
 *             allOf:
 *               - $ref: '#/components/schemas/Enrollment'
 *               - type: object
 *                 properties:
 *                   course:
 *                     $ref: '#/components/schemas/Course'
 *
 *     Job:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         department:
 *           type: string
 *         location:
 *           type: string
 *         description:
 *           type: string
 *         employment:
 *           type: string
 *           enum: [FULL_TIME, PART_TIME, CONTRACT]
 *         isActive:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     JobCreateInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - employment
 *       properties:
 *         title:
 *           type: string
 *           example: Software Engineer
 *         department:
 *           type: string
 *           example: Engineering
 *         location:
 *           type: string
 *           example: Remote
 *         description:
 *           type: string
 *         employment:
 *           type: string
 *           enum: [FULL_TIME, PART_TIME, CONTRACT]
 *
 *     JobApplicationInput:
 *       type: object
 *       required:
 *         - jobId
 *         - name
 *         - email
 *         - resumeUrl
 *       properties:
 *         jobId:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         resumeUrl:
 *           type: string
 *         coverNote:
 *           type: string
 *
 *     HRContactInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *
 *     # ======================
 *     # BLOG
 *     # ======================
 *
 *     BlogPreview:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: cmabc123blog1
 *         slug:
 *           type: string
 *           example: benefits-of-microgreens
 *         title:
 *           type: string
 *           example: Benefits of Microgreens
 *         excerpt:
 *           type: string
 *           nullable: true
 *           example: Learn why microgreens are nutrient-dense and easy to grow.
 *         author:
 *           type: string
 *           nullable: true
 *           example: Microbloom Team
 *         category:
 *           type: string
 *           nullable: true
 *           example: Farming
 *         coverImage:
 *           type: string
 *           nullable: true
 *           example: https://example.com/images/blog-cover.jpg
 *         readTime:
 *           type: integer
 *           format: int32
 *           nullable: true
 *           example: 4
 *         featured:
 *           type: boolean
 *           description: Marks this blog as featured.
 *           example: false
 *         publishedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: 2026-04-09T10:30:00.000Z
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2026-04-09T09:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2026-04-09T10:00:00.000Z
 *
 *     BlogDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: cmabc123blog1
 *         slug:
 *           type: string
 *           example: benefits-of-microgreens
 *         title:
 *           type: string
 *           example: Benefits of Microgreens
 *         excerpt:
 *           type: string
 *           nullable: true
 *           example: Learn why microgreens are nutrient-dense and easy to grow.
 *         content:
 *           type: string
 *           example: "# Benefits of Microgreens\n\nMicrogreens are rich in nutrients and easy to grow at home.\n\n## Why they matter\n\n- Nutrient dense\n- Fast growing\n- Great for business"
 *         author:
 *           type: string
 *           nullable: true
 *           example: Microbloom Team
 *         category:
 *           type: string
 *           nullable: true
 *           example: Farming
 *         coverImage:
 *           type: string
 *           nullable: true
 *           example: https://example.com/images/blog-cover.jpg
 *         readTime:
 *           type: integer
 *           format: int32
 *           nullable: true
 *           example: 4
 *         seoTitle:
 *           type: string
 *           nullable: true
 *           example: Benefits of Microgreens | Microbloom
 *         seoDescription:
 *           type: string
 *           nullable: true
 *           example: Discover why microgreens are among the most powerful superfoods and easiest crops to grow.
 *         published:
 *           type: boolean
 *           example: true
 *         featured:
 *           type: boolean
 *           description: Marks this blog as featured. Only one blog should be featured at a time.
 *           example: true
 *         publishedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: 2026-04-09T10:30:00.000Z
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2026-04-09T09:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2026-04-09T10:00:00.000Z
 *
 *     BlogCreate:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           example: Benefits of Microgreens
 *         slug:
 *           type: string
 *           example: benefits-of-microgreens
 *         excerpt:
 *           type: string
 *           nullable: true
 *           example: Learn why microgreens are nutrient-dense and easy to grow.
 *         content:
 *           type: string
 *           example: "# Benefits of Microgreens\n\nMicrogreens are rich in nutrients..."
 *         author:
 *           type: string
 *           nullable: true
 *           example: Microbloom Team
 *         category:
 *           type: string
 *           nullable: true
 *           example: Farming
 *         coverImage:
 *           type: string
 *           nullable: true
 *           example: https://example.com/images/blog-cover.jpg
 *         readTime:
 *           type: integer
 *           format: int32
 *           nullable: true
 *           example: 4
 *         seoTitle:
 *           type: string
 *           nullable: true
 *           example: Benefits of Microgreens | Microbloom
 *         seoDescription:
 *           type: string
 *           nullable: true
 *           example: Discover the health and farming benefits of microgreens.
 *         published:
 *           type: boolean
 *           example: false
 *         featured:
 *           type: boolean
 *           description: Set to true to make this the featured blog.
 *           example: false
 *
 *     BlogUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Updated Blog Title
 *         slug:
 *           type: string
 *           example: updated-blog-title
 *         excerpt:
 *           type: string
 *           nullable: true
 *           example: Updated short summary of the blog.
 *         content:
 *           type: string
 *           example: "# Updated Blog\n\nThis is updated markdown content."
 *         author:
 *           type: string
 *           nullable: true
 *           example: Updated Author
 *         category:
 *           type: string
 *           nullable: true
 *           example: Guides
 *         coverImage:
 *           type: string
 *           nullable: true
 *           example: https://example.com/images/updated-blog-cover.jpg
 *         readTime:
 *           type: integer
 *           format: int32
 *           nullable: true
 *           example: 5
 *         seoTitle:
 *           type: string
 *           nullable: true
 *           example: Updated SEO Title
 *         seoDescription:
 *           type: string
 *           nullable: true
 *           example: Updated SEO description for this blog.
 *         published:
 *           type: boolean
 *           example: true
 *         featured:
 *           type: boolean
 *           description: Set to true to make this the featured blog.
 *           example: true
 *
 *     BlogResponse:
 *       type: object
 *       properties:
 *         ok:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/BlogDetail'
 * 
 * 
 * 
 * 
 *     # ======================
 *     # PRODUCTS
 *     # ======================
 *
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: clx123abc456
 *         name:
 *           type: string
 *           example: Wheatgrass Powder
 *         slug:
 *           type: string
 *           example: wheatgrass-powder
 *         tagline:
 *           type: string
 *           example: Organic wheatgrass powder for smoothies
 *         description:
 *           type: string
 *           example: A nutrient-rich wheatgrass powder made from organic crops.
 *         imageUrl:
 *           type: string
 *           example: https://example.com/images/wheatgrass.jpg
 *         gallery:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - https://example.com/images/wheatgrass-1.jpg
 *             - https://example.com/images/wheatgrass-2.jpg
 *         category:
 *           type: string
 *           example: Superfoods
 *         benefits:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - Rich in antioxidants
 *             - Supports digestion
 *             - Boosts immunity
 *         nutrition:
 *           type: object
 *           additionalProperties: true
 *           example:
 *             calories: 35
 *             protein: 2g
 *             fiber: 4g
 *         featured:
 *           type: boolean
 *           example: true
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     ProductCreateInput:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           example: Wheatgrass Powder
 *         tagline:
 *           type: string
 *           example: Organic wheatgrass powder
 *         description:
 *           type: string
 *           example: A nutrient-rich wheatgrass powder made from organic crops.
 *         imageUrl:
 *           type: string
 *           example: https://example.com/images/wheatgrass.jpg
 *         gallery:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - https://example.com/images/wheatgrass-1.jpg
 *             - https://example.com/images/wheatgrass-2.jpg
 *         category:
 *           type: string
 *           example: Superfoods
 *         benefits:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - Rich in antioxidants
 *             - Supports digestion
 *         nutrition:
 *           type: object
 *           additionalProperties: true
 *           example:
 *             calories: 35
 *             protein: 2g
 *         featured:
 *           type: boolean
 *           example: false
 *
 *     ProductUpdateInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Wheatgrass Powder Premium
 *         tagline:
 *           type: string
 *           example: Updated organic wheatgrass powder
 *         description:
 *           type: string
 *           example: Updated description for the product.
 *         imageUrl:
 *           type: string
 *           example: https://example.com/images/wheatgrass-new.jpg
 *         gallery:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - https://example.com/images/wheatgrass-new-1.jpg
 *             - https://example.com/images/wheatgrass-new-2.jpg
 *         category:
 *           type: string
 *           example: Health Supplements
 *         benefits:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - Boosts immunity
 *             - Supports digestion
 *         nutrition:
 *           type: object
 *           additionalProperties: true
 *           example:
 *             calories: 40
 *             protein: 3g
 *         featured:
 *           type: boolean
 *           example: true
 *         isActive:
 *           type: boolean
 *           example: true
 *
 *     ApiResponseProduct:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/Product'
 *
 *     ApiResponseProducts:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *
 *     ApiResponseMessage:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Product deleted successfully
 * 
 *     ### ====================
 *     # SERVICES
 *     # ======================
 * 
 * 
 *     Service:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: clxabc123456
 *         slug:
 *           type: string
 *           example: ai-machine-learning
 *         title:
 *           type: string
 *           example: AI & Machine Learning
 *         shortDescription:
 *           type: string
 *           example: Build intelligent systems that automate and optimize workflows.
 *         description:
 *           type: string
 *           example: We create AI-powered solutions tailored to your business needs, including predictive analytics, automation systems, NLP, and computer vision applications.
 *         image:
 *           type: string
 *           nullable: true
 *           example: https://images.unsplash.com/photo-1677442136019-21780ecad995
 *         featured:
 *           type: boolean
 *           example: true
 *         order:
 *           type: integer
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2026-04-09T12:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2026-04-09T12:00:00.000Z
 *
 *     CreateServiceInput:
 *       type: object
 *       required:
 *         - title
 *         - shortDescription
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           example: AI & Machine Learning
 *         shortDescription:
 *           type: string
 *           example: Build intelligent systems that automate and optimize workflows.
 *         description:
 *           type: string
 *           example: We create AI-powered solutions tailored to your business needs, including predictive analytics, automation systems, NLP, and computer vision applications.
 *         image:
 *           type: string
 *           nullable: true
 *           example: https://images.unsplash.com/photo-1677442136019-21780ecad995
 *         featured:
 *           type: boolean
 *           example: true
 *         order:
 *           type: integer
 *           example: 1
 *
 *     UpdateServiceInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: AI & Machine Learning
 *         shortDescription:
 *           type: string
 *           example: Build intelligent systems that automate and optimize workflows.
 *         description:
 *           type: string
 *           example: Updated full service description here.
 *         image:
 *           type: string
 *           nullable: true
 *           example: https://images.unsplash.com/photo-1677442136019-21780ecad995
 *         featured:
 *           type: boolean
 *           example: false
 *         order:
 *           type: integer
 *           example: 2
 */


export {};
