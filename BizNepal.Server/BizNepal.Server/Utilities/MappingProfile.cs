using AutoMapper;
using BizNepal.Server.Models.DTO;
using BizNepal.Server.Models;

namespace BizNepal.Server.Utilities;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Category, CategoryResponseDto>();


        CreateMap<Business, BusinessResponseDto>()
        .ForMember(dest => dest.Location, opt => opt.MapFrom(src => new Location
        {
            LocationId = src.Location.LocationId,
            Latitude = src.Location.Latitude,
            Longitude = src.Location.Longitude
        }))

        .ForMember(dest => dest.Category, opt => opt.MapFrom(src => new Category
        {
            CategoryId = src.CategoryId,
            CategoryName = src.Category.CategoryName,
            IconPath=src.Category.IconPath
            
        }))

        .ForMember(dest => dest.BusinessImages, opt => opt.MapFrom(src => src.BusinessImages))

        .ForMember(dest => dest.Reviews, opt => opt.MapFrom(src => src.Reviews));

        CreateMap<CreateCategoryDto, Category>().ReverseMap();

        CreateMap<BusinessImage, ImageResponseDto>()
           
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.ImageUrl))
            .ForMember(dest => dest.ImageId, opt => opt.MapFrom(src => src.ImageId))
            .ForSourceMember(src => src.Business, opt => opt.DoNotValidate())
            .ForSourceMember(src => src.BusinessId, opt => opt.DoNotValidate());
    }
}
