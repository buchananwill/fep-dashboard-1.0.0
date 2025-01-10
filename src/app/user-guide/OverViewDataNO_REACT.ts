import { DomTreeSketch } from '@/app/user-guide/DomTreeSketch';
import { CSSProperties } from 'react';

const deliveryAllocationDiv: CSSProperties = {
  width: '1.5rem',
  height: '1.5rem',
  borderRadius: 'var(--mantine-radius-sm)',
  border: '2px solid var(--mantine-color-blue-7)',
  backgroundColor: 'var(--mantine-color-blue-5)'
};

const deliveryAllocationList: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: '0.25rem',
  marginLeft: 'auto',
  marginRight: 'auto'
};
export const overViewData: DomTreeSketch = {
  component: {
    styles: {
      title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 'var(--mantine-font-size-xl)',
        textDecoration: 'underline',
        paddingBottom: 'var(--mantine-spacing-md)'
      },

      children: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--mantine-spacing-xl)'
      }
    }
  },
  childComponents: {
    workSchemas: {
      component: {
        styles: {
          card: {
            width: 'fit-content'
          },
          children: {
            display: 'flex',
            flexDirection: 'row',
            gap: 'var(--mantine-spacing-sm)'
          }
        }
      },
      childComponents: {
        workTypes: {
          component: {
            styles: {
              children: {
                display: 'flex',
                flexDirection: 'row',
                gap: 'var(--mantine-spacing-sm)'
              }
            }
          },
          childComponents: {
            classificationAttributes: {
              component: {
                styles: {
                  children: {
                    display: 'flex',
                    flexDirection: 'row'
                  }
                }
              },
              childComponents: {
                workTypeCategorys: { component: {} },
                knowledgeLevelSeries: {
                  component: {},
                  childComponents: {
                    knowledgeLevels: {
                      component: {}
                    }
                  }
                },
                knowledgeDomains: {
                  component: {}
                }
              }
            },
            resourceAttributes: {
              component: {
                styles: {
                  children: {
                    display: 'flex',
                    flexDirection: 'row'
                  }
                }
              },
              childComponents: {
                assetRoleTypes: { component: {} },
                providerRoleTypes: { component: {} }
              }
            }
          }
        },
        deliveryAllocations: {
          component: {}
        }
      }
    },
    workSchemaNodes: {
      component: {
        styles: {
          card: {
            width: 'fit-content'
          },
          children: {
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--mantine-spacing-md)'
          }
        }
      },
      childComponents: {
        workSchemaNodeA: {
          component: {
            styles: {
              card: {
                width: 'fit-content'
              },
              children: {
                display: 'flex',
                flexDirection: 'row'
              }
            }
          },
          childComponents: {
            workSchemaNodeA1: {
              component: {},
              childComponents: {
                workSchema: {
                  component: {
                    styles: {
                      card: {
                        padding: 'var(--mantine-spacing-xs)'
                      },
                      title: { fontSize: 'var(--mantine-font-size-xs)' }
                    }
                  }
                }
              }
            },
            workSchemaNodeA2: {
              component: {},
              childComponents: {
                workSchema: {
                  component: {
                    styles: {
                      card: {
                        padding: 'var(--mantine-spacing-xs)'
                      },
                      title: { fontSize: 'var(--mantine-font-size-xs)' }
                    }
                  }
                }
              }
            },
            workSchemaNodeA3: {
              component: {},
              childComponents: {
                workSchema: {
                  component: {
                    styles: {
                      card: {
                        padding: 'var(--mantine-spacing-xs)'
                      },
                      title: { fontSize: 'var(--mantine-font-size-xs)' }
                    }
                  }
                }
              }
            }
          }
        },
        workSchemaNodeB: {
          component: {
            styles: {
              card: {
                width: 'fit-content'
              },
              children: {
                display: 'flex',
                flexDirection: 'row'
              }
            }
          },
          childComponents: {
            workSchemaNodeB1: {
              component: {},
              childComponents: {
                workSchema: {
                  component: {
                    styles: {
                      card: {
                        padding: 'var(--mantine-spacing-xs)'
                      },
                      title: { fontSize: 'var(--mantine-font-size-xs)' }
                    }
                  }
                }
              }
            },
            workSchemaNodeB2: {
              component: {},
              childComponents: {
                workSchema: {
                  component: {
                    styles: {
                      card: {
                        padding: 'var(--mantine-spacing-xs)'
                      },
                      title: { fontSize: 'var(--mantine-font-size-xs)' }
                    }
                  }
                }
              }
            },
            workSchemaNodeB3: {
              component: {},
              childComponents: {
                workSchema: {
                  component: {
                    styles: {
                      card: {
                        padding: 'var(--mantine-spacing-xs)'
                      },
                      title: { fontSize: 'var(--mantine-font-size-xs)' }
                    }
                  }
                }
              }
            },
            workSchemaNodeB4: {
              component: {},
              childComponents: {
                workSchema: {
                  component: {
                    styles: {
                      card: {
                        padding: 'var(--mantine-spacing-xs)'
                      },
                      title: { fontSize: 'var(--mantine-font-size-xs)' }
                    }
                  }
                }
              }
            }
          }
        },
        workSchemaNodeC: {
          component: {
            styles: {
              card: {
                width: 'fit-content'
              },
              children: {
                display: 'flex',
                flexDirection: 'row'
              }
            }
          },
          childComponents: {
            workSchemaNodeC1: {
              component: {},
              childComponents: {
                workSchema: {
                  component: {
                    styles: {
                      card: {
                        padding: 'var(--mantine-spacing-xs)'
                      },
                      title: { fontSize: 'var(--mantine-font-size-xs)' }
                    }
                  }
                }
              }
            },
            workSchemaNodeC2: {
              component: {
                styles: {
                  children: {
                    display: 'flex',
                    flexDirection: 'row'
                  }
                }
              },
              childComponents: {
                workSchemaNodeC2A: {
                  component: {},
                  childComponents: {
                    workSchema: {
                      component: {
                        styles: {
                          card: {
                            padding: 'var(--mantine-spacing-xs)'
                          },
                          title: { fontSize: 'var(--mantine-font-size-xs)' }
                        }
                      }
                    }
                  }
                },
                workSchemaNodeC2B: {
                  component: {},
                  childComponents: {
                    workSchema: {
                      component: {
                        styles: {
                          card: {
                            padding: 'var(--mantine-spacing-xs)'
                          },
                          title: { fontSize: 'var(--mantine-font-size-xs)' }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    schedulingInputPlan: {
      component: {
        styles: {
          card: {
            width: 'fit-content',
            margin: 'auto'
          },
          children: {
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--mantine-spacing-sm)'
          }
        }
      },
      childComponents: {
        organizations: { component: {} },
        resources: {
          component: {},
          childComponents: {
            assetRoles: {
              component: {}
            },
            providerRoles: {
              component: {}
            }
          }
        }
      }
    }
  }
};
